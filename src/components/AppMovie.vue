<template>
    <tr>
        <th scope="row">
            {{ number + 1 }}
        </th>
        <td
            v-if="'id' in displayedFields"
            headers="id"
        >
            <div class="app-table-cell">
                {{ movie.id }}
            </div>
        </td>
        <td
            v-if="'title' in displayedFields"
            headers="title"
        >
            <div class="app-table-cell">
                {{ movie.title ? movie.title : 'N/A' }}
            </div>
        </td>
        <td
            v-if="'original_title' in displayedFields"
            headers="original_title"
        >
            <div class="app-table-cell">
                {{ movie.original_title ? movie.original_title : 'N/A'}}
            </div>
        </td>
        <td
            v-if="'release_date' in displayedFields"
            headers="release_date"
        >
            <div class="app-table-cell">
                {{ releaseDateFormatted }}
            </div>
        </td>
        <td
            v-if="'status' in displayedFields"
            headers="status"
        >
            <div class="app-table-cell">
                <a
                    v-if="movie.status !== null"
                    href="#"
                    target="_blank"
                    @click.prevent="filter('status', movie.status)"
                >{{ movie.status }}</a>
                <span v-else>N/A</span>
            </div>
        </td>
        <td
            v-if="'production_countries' in displayedFields"
            headers="production_countries"
        >
            <div class="app-table-cell">
                <template v-if="movie.production_countries !== null">
                    <span
                        v-for="n in movie.production_countries.length"
                        :key="n"
                    >
                        {{ movie.production_countries[n - 1].name }}{{ n < movie.production_countries.length ? ',&#160;' : '' }}
                    </span>
                </template>
                <span v-else>N/A</span>
            </div>
        </td>
        <td
            v-if="'tagline' in displayedFields"
            headers="tagline"
        >
            <div class="app-table-cell">
                {{ movie.tagline ? movie.tagline : 'N/A' }}
            </div>
        </td>
        <td
            v-if="'genres' in displayedFields"
            headers="genres"
        >
            <div class="app-table-cell">
                <template v-if="movie.genres !== null">
                    <span
                        v-for="n in movie.genres.length"
                        :key="n"
                    >
                        <a
                            href="#"
                            target="_blank"
                            @click.prevent="filter('genres', [movie.genres[n - 1].name])"
                        >{{movie.genres[n - 1].name }}</a>{{ n < movie.genres.length ? ',&#160;' : '' }}
                    </span>
                </template>
                <span v-else>N/A</span>
            </div>
        </td>
        <td
            v-if="'budget' in displayedFields"
            headers="budget"
        >
            <div class="app-table-cell">
                {{ budgetFormatted }}
            </div>
        </td>
        <td
            v-if="'revenue' in displayedFields"
            headers="revenue"
        >
            <div class="app-table-cell">
                {{ revenueFormatted }}
            </div>
        </td>
        <td
            v-if="'adult' in displayedFields"
            headers="adult"
        >
            <div class="app-table-cell">
                <a
                    v-if="movie.adult !== null"
                    href="#"
                    target="_blank"
                    @click.prevent="filter('adult', movie.adult)"
                >{{ movie.adult ? 'Yes' : 'No' }}</a>
                <span v-else>N/A</span>
            </div>
        </td>
        <td
            v-if="'belongs_to_collection' in displayedFields"
            headers="belongs_to_collection"
        >
            <div class="app-table-cell">
                {{ movie.belongs_to_collection ? movie.belongs_to_collection.name : 'N/A' }}
            </div>
        </td>
        <td
            v-if="'homepage' in displayedFields"
            headers="homepage"
        >
            <div class="app-table-cell">
                <a
                    v-if="movie.homepage !== null"
                    :href="movie.homepage"
                    target="_blank"
                >link</a>
                <span v-else>N/A</span>
            </div>
        </td>
        <td
            v-if="'imdb_id' in displayedFields"
            headers="imdb_id"
        >
            <div class="app-table-cell">
                <a
                    v-if="movie.imdb_id !== null"
                    :href="`http://www.imdb.com/title/${movie.imdb_id}/`"
                    target="_blank"
                >IMDB</a>
                <span v-else>N/A</span>
            </div>
        </td>
        <td
            v-if="'original_language' in displayedFields"
            headers="original_language"
        >
            <div class="app-table-cell">
                <a
                    v-if="originalLanguage !== null"
                    href="#"
                    target="_blank"
                    @click.prevent="filter('original_language', originalLanguage.iso_639_1)"
                >{{ originalLanguage.name }}</a>
                <span v-else>N/A</span>
            </div>
        </td>
        <td
            v-if="'spoken_languages' in displayedFields"
            headers="spoken_languages"
        >
            <div class="app-table-cell">
                <template v-if="movie.spoken_languages !== null">
                    <span
                        v-for="n in movie.spoken_languages.length"
                        :key="n"
                    >
                        <a
                            href="#"
                            target="_blank"
                            @click.prevent="filter('spoken_languages', [movie.spoken_languages[n - 1].iso_639_1])"
                        >{{ movie.spoken_languages[n - 1].name }}</a>{{ n < movie.spoken_languages.length ? ',&#160;' : '' }}
                    </span>
                </template>
                <span v-else>N/A</span>
            </div>
        </td>
        <td
            v-if="'overview' in displayedFields"
            headers="overview"
        >
            <div class="app-table-cell">
                {{ movie.overview ? movie.overview : 'N/A' }}
            </div>
        </td>
        <td
            v-if="'production_companies' in displayedFields"
            headers="production_companies"
        >
            <div class="app-table-cell">
                <template v-if="movie.production_companies !== null">
                    <span
                        v-for="n in movie.production_companies.length"
                        :key="n"
                    >
                        {{ movie.production_companies[n - 1].name }}{{ n < movie.production_companies.length ? ',&#160;' : '' }}
                    </span>
                </template>
                <span v-else>N/A</span>
            </div>
        </td>
        <td
            v-if="'runtime' in displayedFields"
            headers="runtime"
        >
            <div class="app-table-cell">
                {{ runtimeFormatted }}
            </div>
        </td>
        <td
            v-if="'popularity' in displayedFields"
            headers="popularity"
        >
            <div class="app-table-cell">
                {{ popularityShort }}
            </div>
        </td>
        <td
            v-if="'vote_average' in displayedFields"
            headers="vote_average"
        >
            <div class="app-table-cell">
                {{ voteAverageShort }}
            </div>
        </td>
        <td
            v-if="'vote_count' in displayedFields"
            headers="vote_count"
        >
            <div class="app-table-cell">
                {{ movie.vote_count ? movie.vote_count : 'N/A' }}
            </div>
        </td>
    </tr>
</template>

<script>
    export default {
        name: 'AppMovie',

        props: {
            number: {
                type: Number,
                required: true
            },
            movie: {
                type: Object,
                required: true
            }
        },

        computed: {
            displayedFields() {
                return this.$store.getters.getDisplayedFields;
            },

            originalLanguage() {
                if (this.movie.original_language === null) return null;
                let lang = this.$store.state.languages.find(lang => lang.iso_639_1 === this.movie.original_language);
                if (lang === undefined) return {
                    'iso_639_1': this.movie.original_language,
                    'name': this.movie.original_language
                };
                return lang;
            },

            budgetFormatted() {
                if (this.movie.budget === null) return 'N/A';
                return `\$${this.formatNumber(this.movie.budget)}`;
            },

            releaseDateFormatted() {
                if (this.movie.release_date === null) return 'N/A';
                return new Date(this.movie.release_date).toLocaleString(document.documentElement.lang, {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                });
            },

            popularityShort() {
                if (this.movie.popularity === null) return 'N/A';
                return this.movie.popularity.toFixed(2);
            },

            revenueFormatted() {
                if (this.movie.revenue === null) return 'N/A';
                return `\$${this.formatNumber(this.movie.revenue)}`;
            },

            runtimeFormatted() {
                if (this.movie.runtime === null) return 'N/A';

                let hours = Math.floor(this.movie.runtime / 60);
                if (hours > 0) {
                    return `${hours}h ${this.movie.runtime % 60}min`;
                } else {
                    return `${this.movie.runtime}min`;
                }
            },

            voteAverageShort() {
                if (this.movie.vote_average === null) return 'N/A';
                return this.movie.vote_average.toFixed(1);
            }
        },

        methods: {
            formatNumber(num) {
                return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            },

            filter(field, argument) { //TODO
                let f = {};
                f[field] = argument;
                this.$store.commit('setCurrentPageNumber', 1);
                this.$store.dispatch('loadMovies', f);
            }
        }
    };
</script>

<style scoped>

</style>