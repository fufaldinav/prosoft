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

            availablePageSizes() {
                return this.$store.state.availablePageSizes;
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

            availableSortField() {
                return this.$store.state.availableSortField;
            },

            movies() {
                return this.$store.state.movies;
            },

            pageCount() {
                return this.$store.getters.pageCount;
            },

            displayedFields() {
                return this.$store.getters.getDisplayedFields;
            }
        },

        methods: {
            rowNumber(n) {
                return n + 1 + (this.currentPageNumber - 1) * this.pageSize;
            },

            checkQuery(query = {}) {
                let pageNumber = query.page ? parseInt(query.page, 10) : this.currentPageNumber;
                if (isNaN(pageNumber) || pageNumber < 1) {
                    pageNumber = this.currentPageNumber;
                }
                if (pageNumber !== this.currentPageNumber) {
                    this.$store.commit('setCurrentPageNumber', pageNumber);
                }

                let pageSize = query.page_size ? parseInt(query.page_size, 10) : this.pageSize;
                if (isNaN(pageSize) || this.availablePageSizes.indexOf(pageSize) === -1) {
                    pageSize = this.pageSize;
                }
                if (pageSize !== this.pageSize) {
                    this.$store.commit('setPageSize', pageSize);
                }

                let sortField = query.sort_field;
                if (sortField !== undefined && this.availableSortField.indexOf(sortField) === -1) {
                    sortField = this.sortField;
                }
                if (sortField === undefined && this.sortField !== null) {
                    this.$store.commit('clearSortField');
                }
                else if (sortField !== this.sortField) {
                    this.$store.commit('setSortField', sortField);
                }

                let sortOrder = query.sort_order ? query.sort_order : this.sortOrder;
                if (sortOrder !== 'asc' && sortOrder !== 'desc') {
                    sortOrder = this.sortOrder;
                }
                if (sortOrder !== this.sortOrder) {
                    this.$store.commit('setSortOrder', sortOrder);
                }

                return {
                    ...query,
                    page: pageNumber,
                    page_size: pageSize,
                    sort_field: sortField || undefined,
                    sort_order: sortField ? sortOrder : undefined
                };
            }
        },

        beforeRouteEnter(to, from, next) {
            next(vm => {
                console.log('enter'); //TODO удалить
                let query = vm.checkQuery(to.query);
                vm.$router.replace({ path: to.path, query: query })
                    .catch(err => {
                        if (err.name === 'NavigationDuplicated') {
                            vm.$store.dispatch('loadMovies', query)
                                .then(() => {
                                    if (query.page > vm.pageCount) {
                                        vm.$router.replace({
                                            path: to.path,
                                            query: { ...query, 'page': vm.pageCount }
                                        });
                                    }
                                });
                        } else {
                            console.log(err); //TODO обработка ошибки
                        }
                    });
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