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

            availablePageSizes() {
                return this.$store.state.availablePageSizes;
            },

            fields() {
                return this.$store.state.fields;
            },

            sortField() {
                return this.$store.state.sortField;
            },

            currentSortOrder() {
                return this.$store.state.sortOrder.current;
            },

            availableSortOrder() {
                return this.$store.state.sortOrder.available;
            },

            filters() {
                return this.$store.state.filters;
            },

            filtersMinMax() {
                return this.$store.state.filtersMinMax;
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

            sortableFields() {
                return this.$store.getters.getSortableFields;
            },
        },

        methods: {
            getRowNumber(n) {
                return n + 1 + (this.currentPageNumber - 1) * this.pageSize;
            },

            isInteger(n) {
                return n === Number(n) && n % 1 !== 0;
            },

            isFloat(n) {
                return n === Number(n) && n % 1 !== 0;
            },

            checkQuery(query) {
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

                let sortField = query.sort_field ? query.sort_field : null;
                if (typeof sortField === 'string' && sortField.length > 0 && this.sortableFields.indexOf(sortField) === -1) {
                    sortField = null;
                }
                if (sortField !== this.sortField) {
                    if (sortField === null) {
                        this.$store.commit('clearSortField');
                    } else {
                        this.$store.commit('setSortField', sortField);
                    }
                }

                let sortOrder = query.sort_order ? query.sort_order : null;
                if (this.availableSortOrder.indexOf(sortOrder) === -1) {
                    sortOrder = null;
                }
                if (sortOrder !== this.currentSortOrder) {
                    this.$store.commit('setCurrentSortOrder', sortOrder);
                }

                let imdbId = query.imdb_id ? query.imdb_id : null;
                if (imdbId !== this.filters.imdb_id) {
                    this.$store.commit('setFilter', { filter: 'imdb_id', value: imdbId });
                }

                let ids = query.ids ? (Array.isArray(query.ids) ? query.ids : [query.ids]) : [];
                for (let id of ids) {
                    id = parseInt(id, 10);
                    if (this.isInteger(id) && this.filters.ids.indexOf(id) === -1) {
                        this.$store.commit('addIdToFilter', id);
                    }
                }

                let search = query.search ? query.search : null;
                if (search !== this.filters.search) {
                    this.$store.commit('setFilter', { filter: 'search', value: search });
                }

                let adult = typeof query.adult === 'boolean' ? query.adult : null;
                if (adult !== this.filters.adult) {
                    this.$store.commit('setFilter', { filter: 'adult', value: adult });
                }

                let budgetMin = query.budget_min ? parseInt(query.budget_min, 10) : NaN;
                if (isNaN(budgetMin) || budgetMin < this.filtersMinMax.budget_min || budgetMin >= this.filtersMinMax.budget_max) {
                    budgetMin = null;
                }
                if (budgetMin !== this.filters.budget_min) {
                    this.$store.commit('setFilter', { filter: 'budget_min', value: budgetMin });
                }

                let budgetMax = query.budget_max ? parseInt(query.budget_max, 10) : NaN;
                if (isNaN(budgetMax) || budgetMax <= this.filtersMinMax.budget_min || budgetMax > this.filtersMinMax.budget_max) {
                    budgetMax = null;
                }
                if (budgetMax !== this.filters.budget_max) {
                    this.$store.commit('setFilter', { filter: 'budget_max', value: budgetMax });
                }

                let genres = query.genres ? (Array.isArray(query.genres) ? query.genres : [query.genres]) : [];
                this.$store.commit('setFilter', { filter: 'genres', value: genres });

                let originalLanguage = query.original_language ? query.original_language : null;
                if (originalLanguage !== this.filters.original_language) {
                    this.$store.commit('setFilter', { filter: 'original_language', value: originalLanguage });
                }

                let popularityMin = query.popularity_min ? parseFloat(query.popularity_min) : NaN;
                if (isNaN(popularityMin) || isFinite(popularityMin) || popularityMin < this.filtersMinMax.popularity_min || popularityMin >= this.filtersMinMax.popularity_max) {
                    popularityMin = null;
                }
                if (popularityMin !== this.filters.popularity_min) {
                    this.$store.commit('setFilter', { filter: 'popularity_min', value: popularityMin });
                }

                let popularityMax = query.popularity_max ? parseFloat(query.popularity_max) : NaN;
                if (isNaN(popularityMax) || isFinite(popularityMax) || popularityMax <= this.filtersMinMax.popularity_min || popularityMax > this.filtersMinMax.popularity_max) {
                    popularityMax = null;
                }
                if (popularityMax !== this.filters.popularity_max) {
                    this.$store.commit('setFilter', { filter: 'popularity_max', value: popularityMax });
                }

                let dateMin = Date.parse(this.filtersMinMax.release_date_min);
                let dateMax = Date.parse(this.filtersMinMax.release_date_max);

                let releaseDateMin = query.release_date_min ? Date.parse(query.release_date_min) : NaN;
                if (isNaN(releaseDateMin) || releaseDateMin < dateMin || releaseDateMin >= dateMax) {
                    releaseDateMin = null;
                } else if (this.isInteger(releaseDateMin)) {
                    let date = new Date(releaseDateMin);
                    releaseDateMin = date.toISOString().slice(0, 10);
                }
                if (releaseDateMin !== this.filters.release_date_min) {
                    this.$store.commit('setFilter', { filter: 'release_date_min', value: releaseDateMin });
                }

                let releaseDateMax = query.release_date_max ? Date.parse(query.release_date_max) : NaN;
                if (isNaN(releaseDateMax) || releaseDateMax <= dateMin || releaseDateMax > dateMax) {
                    releaseDateMax = null;
                } else if (this.isInteger(releaseDateMax)) {
                    let date = new Date(releaseDateMax);
                    releaseDateMax = date.toISOString().slice(0, 10);
                }
                if (releaseDateMax !== this.filters.release_date_max) {
                    this.$store.commit('setFilter', { filter: 'release_date_max', value: releaseDateMax });
                }

                let revenueMin = query.revenue_min ? parseInt(query.revenue_min) : NaN;
                if (isNaN(revenueMin) || revenueMin < this.filtersMinMax.revenue_min || revenueMin >= this.filtersMinMax.revenue_max) {
                    revenueMin = null;
                }
                if (revenueMin !== this.filters.revenue_min) {
                    this.$store.commit('setFilter', { filter: 'revenue_min', value: revenueMin });
                }

                let revenueMax = query.revenue_max ? parseInt(query.revenue_max) : NaN;
                if (isNaN(revenueMax) || revenueMax <= this.filtersMinMax.revenue_min || revenueMax > this.filtersMinMax.revenue_max) {
                    revenueMax = null;
                }
                if (revenueMax !== this.filters.revenue_max) {
                    this.$store.commit('setFilter', { filter: 'revenue_max', value: revenueMax });
                }

                let runtimeMin = query.runtime_min ? parseFloat(query.runtime_min) : NaN;
                if (isNaN(runtimeMin) || isFinite(runtimeMin) || runtimeMin < this.filtersMinMax.runtime_min || runtimeMin >= this.filtersMinMax.runtime_max) {
                    runtimeMin = null;
                }
                if (runtimeMin !== this.filters.runtime_min) {
                    this.$store.commit('setFilter', { filter: 'runtime_min', value: runtimeMin });
                }

                let runtimeMax = query.runtime_max ? parseFloat(query.runtime_max) : NaN;
                if (isNaN(runtimeMax) || isFinite(runtimeMax) || runtimeMax <= this.filtersMinMax.runtime_min || runtimeMax > this.filtersMinMax.runtime_max) {
                    runtimeMax = null;
                }
                if (runtimeMax !== this.filters.runtime_max) {
                    this.$store.commit('setFilter', { filter: 'runtime_max', value: runtimeMax });
                }

                let spokenLanguages = query.spoken_languages ? (Array.isArray(query.spoken_languages) ? query.spoken_languages : [query.spoken_languages]) : [];
                this.$store.commit('setFilter', { filter: 'spoken_languages', value: spokenLanguages });

                let status = query.status ? query.status : null;
                if (status !== this.filters.status) {
                    this.$store.commit('setFilter', { filter: 'status', value: status });
                }

                let voteAverageMin = query.vote_average_min ? parseFloat(query.vote_average_min) : NaN;
                if (isNaN(voteAverageMin) || isFinite(voteAverageMin) || voteAverageMin < this.filtersMinMax.vote_average_min || voteAverageMin >= this.filtersMinMax.vote_average_max) {
                    voteAverageMin = null;
                }
                if (voteAverageMin !== this.filters.vote_average_min) {
                    this.$store.commit('setFilter', { filter: 'vote_average_min', value: voteAverageMin });
                }

                let voteAverageMax = query.vote_average_max ? parseFloat(query.vote_average_max) : NaN;
                if (isNaN(voteAverageMax) || isFinite(voteAverageMax) || voteAverageMax <= this.filtersMinMax.vote_average_min || voteAverageMax > this.filtersMinMax.vote_average_max) {
                    voteAverageMax = null;
                }
                if (voteAverageMax !== this.filters.vote_average_max) {
                    this.$store.commit('setFilter', { filter: 'vote_average_max', value: voteAverageMax });
                }

                let voteCountMin = query.vote_count_min ? parseInt(query.vote_count_min, 10) : NaN;
                if (isNaN(voteCountMin) || voteCountMin < this.filtersMinMax.vote_count_min || voteCountMin >= this.filtersMinMax.vote_count_max) {
                    voteCountMin = null;
                }
                if (voteCountMin !== this.filters.vote_count_min) {
                    this.$store.commit('setFilter', { filter: 'vote_count_min', value: voteCountMin });
                }

                let voteCountMax = query.vote_count_max ? parseInt(query.vote_count_max, 10) : NaN;
                if (isNaN(voteCountMax) || voteCountMax <= this.filtersMinMax.vote_count_min || voteCountMax > this.filtersMinMax.vote_count_max) {
                    voteCountMax = null;
                }
                if (voteCountMax !== this.filters.vote_count_max) {
                    this.$store.commit('setFilter', { filter: 'vote_count_max', value: voteCountMax });
                }

                return {
                    ...query,
                    page: pageNumber,
                    page_size: pageSize,
                    sort_field: sortField || undefined,
                    sort_order: (sortField && sortOrder !== null) ? sortOrder : undefined,
                    imdb_id: imdbId || undefined,
                    ids: this.filters.ids.length > 0 ? this.filters.ids : undefined,
                    search: search || undefined,
                    adult: typeof adult === 'boolean' || undefined,
                    budget_min: this.isInteger(budgetMin) ? budgetMin : undefined,
                    budget_max: this.isInteger(budgetMax) ? budgetMax : undefined,
                    genres: genres.length > 0 ? genres : undefined,
                    popularity_min: this.isFloat(popularityMin) ? popularityMin : undefined,
                    popularity_max: this.isFloat(popularityMax) ? popularityMax : undefined,
                    release_date_min: releaseDateMin || undefined,
                    release_date_max: releaseDateMax || undefined,
                    revenue_min: revenueMin || undefined,
                    revenue_max: revenueMax || undefined,
                    runtime_min: this.isFloat(runtimeMin) ? runtimeMin : undefined,
                    runtime_max: this.isFloat(runtimeMax) ? runtimeMax : undefined,
                    spoken_languages: spokenLanguages.length > 0 ? spokenLanguages : undefined,
                    status: status || undefined,
                    vote_average_min: this.isFloat(voteAverageMin) ? voteAverageMin : undefined,
                    vote_average_max: this.isFloat(voteAverageMax) ? voteAverageMax : undefined,
                    vote_count_min: this.isInteger(voteCountMin) ? voteCountMin : undefined,
                    vote_count_max: this.isInteger(voteCountMax) ? voteCountMax : undefined,
                };
            },
        },

        beforeRouteEnter(to, from, next) {
            next(vm => {
                // console.log('enter'); //TODO удалить
                // console.log(from); //TODO удалить
                // console.log(to); //TODO удалить
                let query = vm.checkQuery(to.query);
                vm.$router.replace({ path: to.path, query: query })
                    .catch(err => {
                        if (err.name === 'NavigationDuplicated') {
                            vm.$store.dispatch('loadMovies', query)
                                .then(() => {
                                    if (query.page > vm.pageCount) {
                                        vm.$router.replace({
                                            path: to.path,
                                            query: { ...query, page: vm.pageCount },
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
            // console.log('update'); //TODO удалить
            // console.log(from); //TODO удалить
            // console.log(to); //TODO удалить
            let query = this.checkQuery(to.query);
            this.$store.dispatch('loadMovies', query)
                .then(() => {
                    if (query.page > this.pageCount) {
                        next();
                        this.$router.replace({
                            path: to.path,
                            query: { ...query, page: this.pageCount },
                        });
                    } else {
                        next();
                    }
                })
                .catch(() => next(false));
        },
    };
</script>

<style scoped>

</style>