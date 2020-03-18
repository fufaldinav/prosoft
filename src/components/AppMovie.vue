<template>
    <tr>
        <th scope="row">{{ number + 1 }}</th>
        <td>
            <div class="app-table-cell">{{ movie.id }}</div>
        </td>
        <td>
            <div class="app-table-cell">{{ movie.title }}</div>
        </td>
        <td>
            <div class="app-table-cell">{{ movie.original_title }}</div>
        </td>
        <td>
            <div class="app-table-cell">{{ date }}</div>
        </td>
        <td>
            <div class="app-table-cell">
                <a
                    v-if="movie.status !== null"
                    href="#"
                    target="_blank"
                    @click.prevent="filter('status', movie.status)"
                >
                    {{ movie.status }}
                </a>
                <span v-else>N/A</span>
            </div>
        </td>
        <td>
            <div class="app-table-cell">
                <template v-if="movie.production_countries !== null">
                    <template v-for="n in movie.production_countries.length">
                        {{ movie.production_countries[n - 1].name }}<span v-if="n < movie.production_countries.length">,&#160;</span>
                    </template>
                </template>
                <span v-else>N/A</span>
            </div>
        </td>
        <td>
            <div class="app-table-cell">{{ movie.tagline }}</div>
        </td>
        <td>
            <div class="app-table-cell">
                <template v-if="movie.genres !== null">
                    <template v-for="n in movie.genres.length">
                        <a
                            href="#"
                            target="_blank"
                            @click.prevent="filter('genres', [movie.genres[n - 1].name])"
                        >
                            {{movie.genres[n - 1].name }}</a><span v-if="n < movie.genres.length">,&#160;</span>
                    </template>
                </template>
                <span v-else>N/A</span>
            </div>
        </td>
        <td>
            <div class="app-table-cell">{{ budget }}</div>
        </td>
        <td>
            <div class="app-table-cell">{{ revenue }}</div>
        </td>
        <td>
            <div class="app-table-cell">
                <a
                    v-if="movie.adult !== null"
                    href="#"
                    target="_blank"
                    @click.prevent="filter('adult', movie.adult)"
                >
                    <span v-if="movie.adult">Yes</span>
                    <span v-else>No</span>
                </a>
                <span v-else>N/A</span>
            </div>
        </td>
        <td>
            <div class="app-table-cell">
            <span v-if="movie.belongs_to_collection !== null">
                {{movie.belongs_to_collection.name }}
            </span>
                <span v-else>N/A</span>
            </div>
        </td>
        <td>
            <div class="app-table-cell">
                <a
                    v-if="movie.homepage !== null"
                    :href="movie.homepage"
                    target="_blank"
                >
                    link
                </a>
                <span v-else>N/A</span></div>
        </td>
        <td>
            <div class="app-table-cell">
                <a
                    v-if="movie.imdb_id !== null"
                    :href="`http://www.imdb.com/title/${movie.imdb_id}/`"
                    target="_blank"
                >
                    IMDB
                </a>
                <span v-else>N/A</span>
            </div>
        </td>
        <td>
            <div class="app-table-cell">
                <a
                    v-if="originalLanguage !== null"
                    href="#"
                    target="_blank"
                    @click.prevent="filter('original_language', originalLanguage.iso_639_1)"
                >
                    {{ originalLanguage.name }}
                </a>
                <span v-else>N/A</span>
            </div>
        </td>
        <td>
            <div class="app-table-cell">
                <template v-if="movie.spoken_languages !== null">
                    <template v-for="n in movie.spoken_languages.length">
                        <a
                            href="#"
                            target="_blank"
                            @click.prevent="filter('spoken_languages', [movie.spoken_languages[n - 1].iso_639_1])"
                        >
                            {{ movie.spoken_languages[n - 1].name }}</a><span v-if="n < movie.spoken_languages.length">,&#160;</span>
                    </template>
                </template>
                <span v-else>N/A</span>
            </div>
        </td>
        <td>
            <div class="app-table-cell">{{ movie.overview }}</div>
        </td>
        <td>
            <div class="app-table-cell">
                <template v-if="movie.production_companies !== null">
                    <template v-for="n in movie.production_companies.length">
                        {{ movie.production_companies[n - 1].name }}<span v-if="n < movie.production_companies.length">,&#160;</span>
                    </template>
                </template>
                <span v-else>N/A</span>
            </div>
        </td>
        <td>
            <div class="app-table-cell">{{ runtime }}</div>
        </td>
        <td>
            <div class="app-table-cell">{{ popularity }}</div>
        </td>
        <td>
            <div class="app-table-cell">{{ voteAverage }}</div>
        </td>
        <td>
            <div class="app-table-cell">{{ movie.vote_count }}</div>
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
            dbLanguages() {
                return this.$store.state.languages;
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

            budget() {
                if (this.movie.budget === null) return `N/A`;
                return `\$${this.formatNumber(this.movie.budget)}`;
            },

            date() {
                if (this.movie.release_date === null) return `N/A`;
                return new Date(this.movie.release_date).toLocaleString(document.documentElement.lang, {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                });
            },

            popularity() {
                if (this.movie.popularity === null) return `N/A`;
                return this.movie.popularity.toFixed(2);
            },

            revenue() {
                if (this.movie.revenue === null) return `N/A`;
                return `\$${this.formatNumber(this.movie.revenue)}`;
            },

            runtime() {
                if (this.movie.runtime === null) return `N/A`;

                let hours = Math.floor(this.movie.runtime / 60);
                if (hours > 0) {
                    return `${hours}h ${this.movie.runtime % 60}min`;
                } else {
                    return `${this.movie.runtime}min`;
                }
            },

            voteAverage() {
                if (this.movie.vote_average === null) return `N/A`;
                return this.movie.vote_average.toFixed(1);
            }
        },

        methods: {
            formatNumber(num) {
                return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            },

            filter(field, argument) {
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