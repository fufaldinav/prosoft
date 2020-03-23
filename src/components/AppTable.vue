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
            :number="rowNumber(n)"
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

            displayedFields() {
                return this.$store.getters.getDisplayedFields;
            },

            movies() {
                return this.$store.state.movies;
            },

            pageCount() {
                return this.$store.getters.pageCount;
            }
        },

        methods: {
            rowNumber(n) {
                return n + 1 + (this.currentPageNumber - 1) * this.pageSize;
            },

            checkQuery(query = {}) {
                let pageNumber = query.page ? parseInt(query.page, 10) : this.$store.state.currentPageNumber;
                if (isNaN(pageNumber) || pageNumber < 1) {
                    pageNumber = this.$store.state.currentPageNumber;
                }
                if (pageNumber !== this.$store.state.currentPageNumber) {
                    this.$store.commit('setCurrentPageNumber', pageNumber);
                }

                let pageSize = query.page_size ? parseInt(query.page_size, 10) : this.$store.state.pageSize;
                if (isNaN(pageSize) || this.$store.state.availablePageSizes.indexOf(pageSize) === -1) {
                    pageSize = this.$store.state.pageSize;
                }
                if (pageSize !== this.$store.state.pageSize) {
                    this.$store.commit('setPageSize', pageSize);
                }

                return {...query, page: pageNumber, page_size: pageSize};
            }
        },

        beforeRouteEnter(to, from, next) {
            next(vm => {
                console.log('enter'); //TODO удалить
                let query = vm.checkQuery(to.query);
                if (to.query.page === undefined) {
                    vm.$router.replace({ path: to.path, query: query });
                } else {
                    vm.$store.dispatch('loadMovies', query)
                        .then(() => {
                            if (query.page > vm.pageCount) {
                                vm.$router.replace({ path: to.path, query: { ...query, 'page': vm.pageCount }});
                            }
                        });
                }
            });
        },

        beforeRouteUpdate(to, from, next) {
            console.log('update'); //TODO удалить
            let query = this.checkQuery(to.query);
            this.$store.dispatch('loadMovies', query)
                .then(() => next())
                .catch(() => next(false));
        }
    };
</script>

<style scoped>

</style>