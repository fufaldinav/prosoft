<template>
    <div class="h-100">
        <div
            v-if="loading"
            class="d-flex flex-row align-items-center h-100"
        >
            <div class="container">
                <div class="justify-content-center text-center">
                    <fa :icon="syncIcon" size="4x" spin/>
                </div>
            </div>
        </div>
        <table
            v-else
            class="table table-bordered table-striped table-sm table-responsive"
        >
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
                    <a
                        v-if="fields[field].hasOwnProperty('sortable') && fields[field].sortable === true"
                        :class="{ 'text-dark': (field !== sortField) }"
                        href="#"
                        @click.prevent="sortTable(field)"
                    >
                        <fa :icon="drawSortIcon(field)"/>
                    </a>
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
    </div>
</template>

<script>
    import AppMovie from './AppMovie';
    import {faSort, faSortAmountDown, faSortAmountUp, faSync} from '@fortawesome/free-solid-svg-icons';

    export default {
        name: 'AppTable',

        components: { AppMovie },

        computed: {
            loading() {
                return this.$store.state.loading;
            },

            syncIcon() {
                return faSync;
            },

            currentPageNumber() {
                return this.$store.state.currentPageNumber;
            },

            pageSize() {
                return this.$store.state.pageSize;
            },

            fields() {
                return this.$store.state.fields;
            },

            sortField() {
                return this.$store.state.sortField;
            },

            sortOrder() {
                return this.$store.state.sortOrder;
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

            drawSortIcon(fieldName) {
                if (fieldName === this.sortField) {
                    if (this.sortOrder === 'desc') {
                        return faSortAmountDown;
                    } else {
                        return faSortAmountUp;
                    }
                } else {
                    return faSort;
                }
            },

            sortTable(fieldName) {
                if (fieldName === this.sortField) {
                    if (this.sortOrder === 'desc') {
                        this.$router.push({
                            path: this.$route.path,
                            query: { ...this.$route.query, sort_order: 'asc' },
                        });
                    } else {
                        this.$router.push({
                            path: this.$route.path,
                            query: { ...this.$route.query, sort_order: 'desc' },
                        });
                    }
                } else {
                    this.$router.push({
                        path: this.$route.path,
                        query: { ...this.$route.query, sort_field: fieldName, sort_order: 'asc' },
                    });
                }
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