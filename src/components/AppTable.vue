<template>
    <table class="table table-bordered table-striped table-sm table-responsive">
        <thead class="thead-light">
        <tr>
            <th id="number" scope="col">
                #
            </th>
            <th
                v-for="field in displayedFields"
                :key="`field_${field}`"
                :id="field"
                scope="col"
            >
                {{ fields[field].name }}
            </th>
        </tr>
        </thead>
        <tbody>
        <app-movie
            v-for="(movie, n) in movies"
            :key="`app_movie_${movie.id}`"
            :number="getRowNumber(n)"
            :movie="movie"
        >
        </app-movie>
        </tbody>
    </table>
</template>

<script>
    import AppMovie from './AppMovie';

    export default {
        name: 'AppTable',

        components: { AppMovie },

        computed: {
            currentPageNumber() {
                return this.$store.state.currentPageNumber;
            },

            pageSize() {
                return this.$store.state.pageSize;
            },

            fields() {
                return this.$store.state.fields;
            },

            movies() {
                return this.$store.state.movies;
            },

            pageCount() {
                return this.$store.getters.pageCount;
            },

            displayedFields() {
                return this.$store.getters.getDisplayedFields;
            },

            query() {
                return this.$store.getters.getQuery;
            },
        },

        methods: {
            getRowNumber(n) {
                return n + 1 + (this.currentPageNumber - 1) * this.pageSize;
            },
        },

        beforeRouteEnter(to, from, next) {
            next(vm => {
                // console.log('enter'); //TODO удалить
                // console.log(from); //TODO удалить
                // console.log(to); //TODO удалить
                vm.$store.dispatch('parseQuery', to.query);
                vm.$router.replace({ path: to.path, query: vm.query })
                    .catch(err => {
                        if (err && err.hasOwnProperty('name') && err.name === 'NavigationDuplicated') {
                            vm.$store.dispatch('loadMovies', vm.query)
                                .then(() => {
                                    if (vm.query.page > vm.pageCount) {
                                        vm.$router.replace({
                                            path: to.path,
                                            query: { ...vm.query, page: vm.pageCount },
                                        });
                                    }
                                })
                                .catch(() => {
                                    vm.$router.replace('/error');
                                });
                        } else {
                            // console.log(123); //TODO обработка ошибки
                        }
                    });
            });
        },

        beforeRouteUpdate(to, from, next) {
            // console.log('update'); //TODO удалить
            // console.log(from); //TODO удалить
            // console.log(to); //TODO удалить
            this.$store.dispatch('parseQuery', to.query);
            this.$store.dispatch('loadMovies', this.query)
                .then(() => {
                    if (this.query.page > this.pageCount) {
                        next();
                        this.$router.replace({
                            path: to.path,
                            query: { ...this.query, page: this.pageCount },
                        });
                    } else {
                        next();
                    }
                })
                .catch(() => {
                    next('/error');
                });
        },
    };
</script>

<style scoped>

</style>