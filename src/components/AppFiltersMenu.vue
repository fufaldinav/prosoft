<template>
    <div class="modal fade app-filters-menu" id="filtersMenu" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="filtersMenuTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="filtersMenuTitle">Filters</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <!-- Adult -->
                        <div class="form-group">
                            <label for="filterAdult">Adult Titles</label>
                            <div id="filterAdult" class="form-row">
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
                                <div class="form-check form-check-inline">
                                    <input
                                        class="form-check-input"
                                        type="radio"
                                        name="filterAdult"
                                        id="adultNotSelected"
                                        :value="null"
                                        v-model="filters.adult"
                                    >
                                    <label class="form-check-label" for="adultNotSelected">
                                        Not selected
                                    </label>
                                </div>
                            </div>
                        </div>
                        <!-- Budget -->
                        <div class="form-group">
                            <label for="filterBudget">Budget</label>
                            <div id="filterBudget" class="form-row">
                                <div class="col">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :min="filtersMinMax.budget_min"
                                        :max="filtersMinMax.budget_max"
                                        :placeholder="`min: ${filtersMinMax.budget_min}`"
                                        v-model="filters.budget_min"
                                    >
                                </div>
                                <div class="col">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :min="filtersMinMax.budget_min"
                                        :max="filtersMinMax.budget_max"
                                        :placeholder="`max: ${filtersMinMax.budget_max}`"
                                        v-model="filters.budget_max"
                                    >
                                </div>
                            </div>
                        </div>
                        <!-- Genres -->
                        <div class="form-group">
                            <label for="filterGenres">Genres</label>
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
                            <div id="filterPopularity" class="form-row">
                                <div class="col">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :min="filtersMinMax.popularity_min"
                                        :max="filtersMinMax.popularity_max"
                                        :placeholder="`min: ${filtersMinMax.popularity_min}`"
                                        v-model="filters.popularity_min"
                                    >
                                </div>
                                <div class="col">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :min="filtersMinMax.popularity_min"
                                        :max="filtersMinMax.popularity_max"
                                        :placeholder="`max: ${filtersMinMax.popularity_max}`"
                                        v-model="filters.popularity_max"
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
                            <div id="filterRevenue" class="form-row">
                                <div class="col">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :min="filtersMinMax.revenue_min"
                                        :max="filtersMinMax.revenue_max"
                                        :placeholder="`min: ${filtersMinMax.revenue_min}`"
                                        v-model="filters.revenue_min"
                                    >
                                </div>
                                <div class="col">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :min="filtersMinMax.revenue_min"
                                        :max="filtersMinMax.revenue_max"
                                        :placeholder="`max: ${filtersMinMax.revenue_max}`"
                                        v-model="filters.revenue_max"
                                    >
                                </div>
                            </div>
                        </div>
                        <!-- Runtime -->
                        <div class="form-group">
                            <label for="filterRuntime">Runtime</label>
                            <div id="filterRuntime" class="form-row">
                                <div class="col">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :min="filtersMinMax.runtime_min"
                                        :max="filtersMinMax.runtime_max"
                                        :placeholder="`min: ${filtersMinMax.runtime_min}`"
                                        v-model="filters.runtime_min"
                                    >
                                </div>
                                <div class="col">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :min="filtersMinMax.runtime_min"
                                        :max="filtersMinMax.runtime_max"
                                        :placeholder="`max: ${filtersMinMax.runtime_max}`"
                                        v-model="filters.runtime_max"
                                    >
                                </div>
                            </div>
                        </div>
                        <!-- Spoken languages -->
                        <div class="form-group">
                            <label for="filterLanguages">Spoken languages</label>
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
                            <div id="filterVoteAverage" class="form-row">
                                <div class="col">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :min="filtersMinMax.vote_average_min"
                                        :max="filtersMinMax.vote_average_max"
                                        :placeholder="`min: ${filtersMinMax.vote_average_min}`"
                                        v-model="filters.vote_average_min"
                                    >
                                </div>
                                <div class="col">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :min="filtersMinMax.vote_average_min"
                                        :max="filtersMinMax.vote_average_max"
                                        :placeholder="`max: ${filtersMinMax.vote_average_max}`"
                                        v-model="filters.vote_average_max"
                                    >
                                </div>
                            </div>
                        </div>
                        <!-- Vote count -->
                        <div class="form-group">
                            <label for="filterVoteCount">Vote count</label>
                            <div id="filterVoteCount" class="form-row">
                                <div class="col">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :min="filtersMinMax.vote_count_min"
                                        :max="filtersMinMax.vote_count_max"
                                        :placeholder="`min: ${filtersMinMax.vote_count_min}`"
                                        v-model="filters.vote_count_min"
                                    >
                                </div>
                                <div class="col">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :min="filtersMinMax.vote_count_min"
                                        :max="filtersMinMax.vote_count_max"
                                        :placeholder="`max: ${filtersMinMax.vote_count_max}`"
                                        v-model="filters.vote_count_max"
                                    >
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
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

            genres() {
                return this.$store.state.genres;
            },

            languages() {
                return this.$store.state.languages;
            },

            statuses() {
                return this.$store.state.statuses;
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

            applyFilters() {
                this.$store.dispatch('parseQuery', this.filters);
                this.$router.push({ path: this.$route.path, query: this.query })
                    .catch(err => {
                        if (err && err.hasOwnProperty('name') && err.name === 'NavigationDuplicated') {
                            this.$router.go(0);
                        }
                    });
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