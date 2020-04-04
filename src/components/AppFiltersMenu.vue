<template>
    <div class="modal fade app-filters-menu" id="filtersMenu" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="filtersMenuTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="filtersMenuTitle">Filters</h5>
                    <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        @click="resetFilters()"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <!-- Adult -->
                        <div class="form-group">
                            <label for="filterAdult">Adult Titles</label>
                            <a
                                v-show="filters.adult !== null"
                                href="#"
                                class="badge badge-pill badge-danger"
                                @click.prevent="filters.adult = null"
                            >
                                reset
                            </a>
                            <div id="filterAdult" class="form-row ml-1">
                                <div class="form-check form-check-inline">
                                    <input
                                        class="form-check-input"
                                        type="radio"
                                        name="filterAdult"
                                        id="adultTrue"
                                        :value="true"
                                        v-model="filters.adult"
                                    >
                                    <label class="form-check-label" for="adultTrue">Yes</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input
                                        class="form-check-input"
                                        type="radio"
                                        name="filterAdult"
                                        id="adultFalse"
                                        :value="false"
                                        v-model="filters.adult"
                                    >
                                    <label class="form-check-label" for="adultFalse">No</label>
                                </div>
                            </div>
                        </div>
                        <!-- Budget -->
                        <div class="form-group">
                            <label for="filterBudget">Budget</label>
                            <a
                                v-show="budgetMin !== null || budgetMax !== null"
                                href="#"
                                class="badge badge-pill badge-danger"
                                @click.prevent="resetRangedFilter('budget')"
                            >
                                reset
                            </a>
                            <div id="filterBudget" class="form-row">
                                <div class="col">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :min="filtersMinMax.budget_min"
                                        :max="filtersMinMax.budget_max"
                                        :placeholder="`min: ${filtersMinMax.budget_min}`"
                                        v-model.number="budgetMin"
                                    >
                                </div>
                                <div class="col">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :min="filtersMinMax.budget_min"
                                        :max="filtersMinMax.budget_max"
                                        :placeholder="`max: ${filtersMinMax.budget_max}`"
                                        v-model.number="budgetMax"
                                    >
                                </div>
                            </div>
                        </div>
                        <!-- Genres -->
                        <div class="form-group">
                            <label for="filterGenres">Genres</label>
                            <a
                                v-show="filters.genres.length > 0"
                                href="#"
                                class="badge badge-pill badge-danger"
                                @click.prevent="filters.genres = []"
                            >
                                reset
                            </a>
                            <select
                                multiple
                                class="form-control"
                                id="filterGenres"
                                v-model="filters.genres"
                            >
                                <option
                                    v-for="genre of genres"
                                    :key="`genre_${genre.id}`"
                                    :value="genre.name"
                                >
                                    {{ genre.name }}
                                </option>
                            </select>
                        </div>
                        <!-- Original language -->
                        <div class="form-group">
                            <label for="filterOriginalLanguage">Original language</label>
                            <a
                                v-show="filters.original_language !== null"
                                href="#"
                                class="badge badge-pill badge-danger"
                                @click.prevent="filters.original_language = null"
                            >
                                reset
                            </a>
                            <select
                                class="form-control"
                                id="filterOriginalLanguage"
                                v-model="filters.original_language"
                            >
                                <option :value="null">
                                    Not selected
                                </option>
                                <option
                                    v-for="language of languages"
                                    :key="`original_language_${language.iso_639_1}`"
                                    :value="language.iso_639_1"
                                >
                                    {{ language.name || language.iso_639_1 }}
                                </option>
                            </select>
                        </div>
                        <!-- Popularity -->
                        <div class="form-group">
                            <label for="filterPopularity">Popularity</label>
                            <a
                                v-show="popularityMin !== null || popularityMax !== null"
                                href="#"
                                class="badge badge-pill badge-danger"
                                @click.prevent="resetRangedFilter('popularity')"
                            >
                                reset
                            </a>
                            <div id="filterPopularity" class="form-row">
                                <div class="col">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :min="filtersMinMax.popularity_min"
                                        :max="filtersMinMax.popularity_max"
                                        :placeholder="`min: ${filtersMinMax.popularity_min}`"
                                        v-model.number="popularityMin"
                                    >
                                </div>
                                <div class="col">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :min="filtersMinMax.popularity_min"
                                        :max="filtersMinMax.popularity_max"
                                        :placeholder="`max: ${filtersMinMax.popularity_max}`"
                                        v-model.number="popularityMax"
                                    >
                                </div>
                            </div>
                        </div>
                        <!-- Release date -->
                        <div class="form-group">
                            <label for="filterReleaseDate">Release date</label>
                            <div id="filterReleaseDate" class="form-row">
                                <div class="col">
                                    <input type="date" class="form-control" placeholder="min">
                                </div>
                                <div class="col">
                                    <input type="date" class="form-control" placeholder="max">
                                </div>
                            </div>
                        </div>
                        <!-- Revenue -->
                        <div class="form-group">
                            <label for="filterRevenue">Revenue</label>
                            <a
                                v-show="revenueMin !== null || revenueMax !== null"
                                href="#"
                                class="badge badge-pill badge-danger"
                                @click.prevent="resetRangedFilter('revenue')"
                            >
                                reset
                            </a>
                            <div id="filterRevenue" class="form-row">
                                <div class="col">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :min="filtersMinMax.revenue_min"
                                        :max="filtersMinMax.revenue_max"
                                        :placeholder="`min: ${filtersMinMax.revenue_min}`"
                                        v-model.number="revenueMin"
                                    >
                                </div>
                                <div class="col">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :min="filtersMinMax.revenue_min"
                                        :max="filtersMinMax.revenue_max"
                                        :placeholder="`max: ${filtersMinMax.revenue_max}`"
                                        v-model.number="revenueMax"
                                    >
                                </div>
                            </div>
                        </div>
                        <!-- Runtime -->
                        <div class="form-group">
                            <label for="filterRuntime">Runtime</label>
                            <a
                                v-show="runtimeMin !== null || runtimeMax !== null"
                                href="#"
                                class="badge badge-pill badge-danger"
                                @click.prevent="resetRangedFilter('runtime')"
                            >
                                reset
                            </a>
                            <div id="filterRuntime" class="form-row">
                                <div class="col">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :min="filtersMinMax.runtime_min"
                                        :max="filtersMinMax.runtime_max"
                                        :placeholder="`min: ${filtersMinMax.runtime_min}`"
                                        v-model.number="runtimeMin"
                                    >
                                </div>
                                <div class="col">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :min="filtersMinMax.runtime_min"
                                        :max="filtersMinMax.runtime_max"
                                        :placeholder="`max: ${filtersMinMax.runtime_max}`"
                                        v-model.number="runtimeMax"
                                    >
                                </div>
                            </div>
                        </div>
                        <!-- Spoken languages -->
                        <div class="form-group">
                            <label for="filterLanguages">Spoken languages</label>
                            <a
                                href="#"
                                v-show="filters.spoken_languages.length > 0"
                                class="badge badge-pill badge-danger"
                                @click.prevent="filters.spoken_languages = []"
                            >
                                reset
                            </a>
                            <select
                                multiple
                                class="form-control"
                                id="filterLanguages"
                                v-model="filters.spoken_languages"
                            >
                                <option
                                    v-for="language of languages"
                                    :key="`spoken_language_${language.iso_639_1}`"
                                    :value="language.iso_639_1"
                                >
                                    {{ language.name || language.iso_639_1 }}
                                </option>
                            </select>
                        </div>
                        <!-- Status -->
                        <div class="form-group">
                            <label for="filterStatus">Status</label>
                            <a
                                href="#"
                                v-show="filters.status !== null"
                                class="badge badge-pill badge-danger"
                                @click.prevent="filters.status = null"
                            >
                                reset
                            </a>
                            <select
                                class="form-control"
                                id="filterStatus"
                                v-model="filters.status"
                            >
                                <option :value="null">
                                    Not selected
                                </option>
                                <option
                                    v-for="status of statuses"
                                    :key="`status_${status}`"
                                    :value="status"
                                >
                                    {{ status }}
                                </option>
                            </select>
                        </div>
                        <!-- Vote average -->
                        <div class="form-group">
                            <label for="filterVoteAverage">Vote average</label>
                            <a
                                v-show="voteAverageMin !== null || voteAverageMax !== null"
                                href="#"
                                class="badge badge-pill badge-danger"
                                @click.prevent="resetRangedFilter('vote_average')"
                            >
                                reset
                            </a>
                            <div id="filterVoteAverage" class="form-row">
                                <div class="col">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :min="filtersMinMax.vote_average_min"
                                        :max="filtersMinMax.vote_average_max"
                                        :placeholder="`min: ${filtersMinMax.vote_average_min}`"
                                        v-model.number="voteAverageMin"
                                    >
                                </div>
                                <div class="col">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :min="filtersMinMax.vote_average_min"
                                        :max="filtersMinMax.vote_average_max"
                                        :placeholder="`max: ${filtersMinMax.vote_average_max}`"
                                        v-model.number="voteAverageMax"
                                    >
                                </div>
                            </div>
                        </div>
                        <!-- Vote count -->
                        <div class="form-group">
                            <label for="filterVoteCount">Vote count</label>
                            <a
                                v-show="voteCountMin !== null || voteCountMax !== null"
                                href="#"
                                class="badge badge-pill badge-danger"
                                @click.prevent="resetRangedFilter('vote_count')"
                            >
                                reset
                            </a>
                            <div id="filterVoteCount" class="form-row">
                                <div class="col">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :min="filtersMinMax.vote_count_min"
                                        :max="filtersMinMax.vote_count_max"
                                        :placeholder="`min: ${filtersMinMax.vote_count_min}`"
                                        v-model.number="voteCountMin"
                                    >
                                </div>
                                <div class="col">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :min="filtersMinMax.vote_count_min"
                                        :max="filtersMinMax.vote_count_max"
                                        :placeholder="`max: ${filtersMinMax.vote_count_max}`"
                                        v-model.number="voteCountMax"
                                    >
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="d-flex modal-footer">
                    <button
                        type="button"
                        class="btn btn-danger mr-auto"
                        data-dismiss="modal"
                        @click="applyFilters()"
                    >
                        Reset all
                    </button>
                    <button
                        type="button"
                        class="btn btn-primary"
                        data-dismiss="modal"
                        @click="applyFilters()"
                    >
                        Apply
                    </button>
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                        @click="resetFilters()"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AppFiltersMenu',

        data() {
            return {
                searchPhrase: null,
                filters: {
                    adult: null,             //Boolean
                    budget_min: null,        //Integer
                    budget_max: null,        //Integer
                    genres: [],              //String[]
                    original_language: null, //String
                    popularity_min: null,    //Float
                    popularity_max: null,    //Float
                    release_date_min: null,  //String - дата в формате YYYY-MM-DD
                    release_date_max: null,  //String - дата в формате YYYY-MM-DD
                    revenue_min: null,       //Integer
                    revenue_max: null,       //Integer
                    runtime_min: null,       //Float
                    runtime_max: null,       //Float
                    spoken_languages: [],    //String[]
                    status: null,            //String - статус выхода фильма
                    vote_average_min: null,  //Float
                    vote_average_max: null,  //Float
                    vote_count_min: null,    //Integer
                    vote_count_max: null,    //Integer
                },
            };
        },

        computed: {
            currentFilters() {
                return this.$store.state.filters;
            },

            filtersMinMax() {
                return this.$store.state.filtersMinMax;
            },

            budgetMin: {
                get() {
                    return this.filters.budget_min;
                },

                set(value) {
                    this.filters.budget_min = this.checkInputValue('budget', value);
                    if (this.filters.budget_max !== null && this.filters.budget_min > this.filters.budget_max) {
                        this.filters.budget_min = this.filters.budget_max;
                    }
                },
            },

            budgetMax: {
                get() {
                    return this.filters.budget_max;
                },

                set(value) {
                    this.filters.budget_max = this.checkInputValue('budget', value);
                    if (this.filters.budget_min !== null && this.filters.budget_max < this.filters.budget_min) {
                        this.filters.budget_max = this.filters.budget_min;
                    }
                },
            },

            popularityMin: {
                get() {
                    return this.filters.popularity_min;
                },

                set(value) {
                    this.filters.popularity_min = this.checkInputValue('popularity', value);
                    if (this.filters.popularity_max !== null && this.filters.popularity_min > this.filters.popularity_max) {
                        this.filters.popularity_min = this.filters.popularity_max;
                    }
                },
            },

            popularityMax: {
                get() {
                    return this.filters.popularity_max;
                },

                set(value) {
                    this.filters.popularity_max = this.checkInputValue('popularity', value);
                    if (this.filters.popularity_min !== null && this.filters.popularity_max < this.filters.popularity_min) {
                        this.filters.popularity_max = this.filters.popularity_min;
                    }
                },
            },

            revenueMin: {
                get() {
                    return this.filters.revenue_min;
                },

                set(value) {
                    this.filters.revenue_min = this.checkInputValue('revenue', value);
                    if (this.filters.revenue_max !== null && this.filters.revenue_min > this.filters.revenue_max) {
                        this.filters.revenue_min = this.filters.revenue_max;
                    }
                },
            },

            revenueMax: {
                get() {
                    return this.filters.revenue_max;
                },

                set(value) {
                    this.filters.revenue_max = this.checkInputValue('revenue', value);
                    if (this.filters.revenue_min !== null && this.filters.revenue_max < this.filters.revenue_min) {
                        this.filters.revenue_max = this.filters.revenue_min;
                    }
                },
            },

            runtimeMin: {
                get() {
                    return this.filters.runtime_min;
                },

                set(value) {
                    this.filters.runtime_min = this.checkInputValue('runtime', value);
                    if (this.filters.runtime_max !== null && this.filters.runtime_min > this.filters.runtime_max) {
                        this.filters.runtime_min = this.filters.runtime_max;
                    }
                },
            },

            runtimeMax: {
                get() {
                    return this.filters.runtime_max;
                },

                set(value) {
                    this.filters.runtime_max = this.checkInputValue('runtime', value);
                    if (this.filters.runtime_min !== null && this.filters.runtime_max < this.filters.runtime_min) {
                        this.filters.runtime_max = this.filters.runtime_min;
                    }
                },
            },

            voteAverageMin: {
                get() {
                    return this.filters.vote_average_min;
                },

                set(value) {
                    this.filters.vote_average_min = this.checkInputValue('vote_average', value);
                    if (this.filters.vote_average_max !== null && this.filters.vote_average_min > this.filters.vote_average_max) {
                        this.filters.vote_average_min = this.filters.vote_average_max;
                    }
                },
            },

            voteAverageMax: {
                get() {
                    return this.filters.vote_average_max;
                },

                set(value) {
                    this.filters.vote_average_max = this.checkInputValue('vote_average', value);
                    if (this.filters.vote_average_min !== null && this.filters.vote_average_max < this.filters.vote_average_min) {
                        this.filters.vote_average_max = this.filters.vote_average_min;
                    }
                },
            },

            voteCountMin: {
                get() {
                    return this.filters.vote_count_min;
                },

                set(value) {
                    this.filters.vote_count_min = this.checkInputValue('vote_count', value);
                    if (this.filters.vote_count_max !== null && this.filters.vote_count_min > this.filters.vote_count_max) {
                        this.filters.vote_count_min = this.filters.vote_count_max;
                    }
                },
            },

            voteCountMax: {
                get() {
                    return this.filters.vote_count_max;
                },

                set(value) {
                    this.filters.vote_count_max = this.checkInputValue('vote_count', value);
                    if (this.filters.vote_count_min !== null && this.filters.vote_count_max < this.filters.vote_count_min) {
                        this.filters.vote_count_max = this.filters.vote_count_min;
                    }
                },
            },

            genres() {
                return this.$store.getters.getGenres;
            },

            languages() {
                return this.$store.getters.getLanguages;
            },

            statuses() {
                return this.$store.getters.getStatuses;
            },

            query() {
                return this.$store.getters.getQuery;
            },
        },

        methods: {
            resetFilters() {
                for (let filterName in this.currentFilters) {
                    if (this.filters.hasOwnProperty(filterName)) {
                        this.filters[filterName] = this.currentFilters[filterName];
                    }
                }
            },

            resetRangedFilter(fieldName) {
                const min = fieldName + '_min';
                const max = fieldName + '_max';
                if (this.filters.hasOwnProperty(min) && this.filters.hasOwnProperty(max)) {
                    this.filters[min] = null;
                    this.filters[max] = null;
                }
            },

            applyFilters() {
                this.$store.dispatch('parseQuery', this.filters);
                this.$router.push({ path: this.$route.path, query: this.query })
                    .catch(err => {
                        if (err && err.hasOwnProperty('name') && err.name === 'NavigationDuplicated') {
                            this.$router.go(0);
                        }
                    });
            },

            isNumber(value) {
                return typeof value === 'number' && isFinite(value) && ! isNaN(value);
            },

            checkInputValue(fieldName, value) {
                const min = fieldName + '_min';
                const max = fieldName + '_max';
                if (! this.isNumber(value) || ! this.filtersMinMax.hasOwnProperty(min) || ! this.filtersMinMax.hasOwnProperty(max)) {
                    return null;
                } else if (value < this.filtersMinMax[min]) {
                    return this.filtersMinMax[min];
                } else if (value > this.filtersMinMax[max]) {
                    return this.filtersMinMax[max];
                } else {
                    return value;
                }
            },
        },

        watch: {
            $route(to, from) {
                this.searchPhrase = this.$store.state.search;
                this.resetFilters();
            },
        },
    };
</script>

<style scoped>

</style>