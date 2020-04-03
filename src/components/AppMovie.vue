<template>
    <tr>
        <th scope="row">
            <div class="text-truncate app-table-cell-wrapper">
                {{ number }}
            </div>
        </th>
        <td
            v-show="displayedFields.indexOf('id') > -1"
            headers="id"
        >
            <div class="text-truncate app-table-cell-wrapper">
                {{ movie.id }}
            </div>
        </td>
        <td
            v-show="displayedFields.indexOf('title') > -1"
            headers="title"
        >
            <div class="text-truncate app-table-cell-wrapper">
                {{ title }}
            </div>
        </td>
        <td
            v-show="displayedFields.indexOf('original_title') > -1"
            headers="original_title"
        >
            <div class="text-truncate app-table-cell-wrapper">
                {{ originalTitle }}
            </div>
        </td>
        <td
            v-show="displayedFields.indexOf('release_date') > -1"
            headers="release_date"
        >
            <div class="text-truncate app-table-cell-wrapper">
                {{ releaseDateFormatted }}
            </div>
        </td>
        <td
            v-show="displayedFields.indexOf('status') > -1"
            headers="status"
        >
            <div class="text-truncate app-table-cell-wrapper">
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
        <td
            v-show="displayedFields.indexOf('production_countries') > -1"
            headers="production_countries"
        >
            <div class="text-truncate app-table-cell-wrapper">
                <template v-if="movie.production_countries !== null">
                    <span
                        v-for="n in movie.production_countries.length"
                        :key="`production_countries_${movie.id}_${n}`"
                    >
                        {{ movie.production_countries[n - 1].name }}{{ n < movie.production_countries.length ? ', ' : '' }}
                    </span>
                </template>
                <span v-else>N/A</span>
            </div>
        </td>
        <td
            v-show="displayedFields.indexOf('tagline') > -1"
            headers="tagline"
        >
            <div class="text-truncate app-table-cell-wrapper">
                {{ tagline }}
            </div>
        </td>
        <td
            v-show="displayedFields.indexOf('genres') > -1"
            headers="genres"
        >
            <div class="text-truncate app-table-cell-wrapper">
                <template v-if="movie.genres !== null">
                    <span
                        v-for="n in movie.genres.length"
                        :key="`genres_${movie.id}_${n}`"
                    >
                        <a
                            href="#"
                            target="_blank"
                            @click.prevent="filter('genres', [movie.genres[n - 1].name])"
                        >{{movie.genres[n - 1].name }}</a>{{ n < movie.genres.length ? ', ' : '' }}
                    </span>
                </template>
                <span v-else>N/A</span>
            </div>
        </td>
        <td
            v-show="displayedFields.indexOf('budget') > -1"
            headers="budget"
        >
            <div class="text-truncate app-table-cell-wrapper">
                {{ budgetFormatted }}
            </div>
        </td>
        <td
            v-show="displayedFields.indexOf('revenue') > -1"
            headers="revenue"
        >
            <div class="text-truncate app-table-cell-wrapper">
                {{ revenueFormatted }}
            </div>
        </td>
        <td
            v-show="displayedFields.indexOf('adult') > -1"
            headers="adult"
        >
            <div class="text-truncate app-table-cell-wrapper">
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
            v-show="displayedFields.indexOf('belongs_to_collection') > -1"
            headers="belongs_to_collection"
        >
            <div class="text-truncate app-table-cell-wrapper">
                {{ movie.belongs_to_collection ? movie.belongs_to_collection.name : 'N/A' }}
            </div>
        </td>
        <td
            v-show="displayedFields.indexOf('homepage') > -1"
            headers="homepage"
        >
            <div class="text-truncate app-table-cell-wrapper">
                <a
                    v-if="movie.homepage !== null"
                    :href="movie.homepage"
                    target="_blank"
                >link</a>
                <span v-else>N/A</span>
            </div>
        </td>
        <td
            v-show="displayedFields.indexOf('imdb_id') > -1"
            headers="imdb_id"
        >
            <div class="text-truncate app-table-cell-wrapper">
                <a
                    v-if="movie.imdb_id !== null"
                    :href="`http://www.imdb.com/title/${movie.imdb_id}/`"
                    target="_blank"
                >IMDB</a>
                <span v-else>N/A</span>
            </div>
        </td>
        <td
            v-show="displayedFields.indexOf('original_language') > -1"
            headers="original_language"
        >
            <div class="text-truncate app-table-cell-wrapper">
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
            v-show="displayedFields.indexOf('spoken_languages') > -1"
            headers="spoken_languages"
        >
            <div class="text-truncate app-table-cell-wrapper">
                <template v-if="movie.spoken_languages !== null">
                    <span
                        v-for="n in movie.spoken_languages.length"
                        :key="`spoken_languages_${movie.id}_${n}`"
                    >
                        <a
                            href="#"
                            target="_blank"
                            @click.prevent="filter('spoken_languages', [movie.spoken_languages[n - 1].iso_639_1])"
                        >{{ movie.spoken_languages[n - 1].name }}</a>{{ n < movie.spoken_languages.length ? ', ' : '' }}
                    </span>
                </template>
                <span v-else>N/A</span>
            </div>
        </td>
        <td
            v-show="displayedFields.indexOf('overview') > -1"
            headers="overview"
        >
            <div class="text-truncate app-table-cell-wrapper">
                {{ overview }}
            </div>
        </td>
        <td
            v-show="displayedFields.indexOf('production_companies') > -1"
            headers="production_companies"
        >
            <div class="text-truncate app-table-cell-wrapper">
                <template v-if="movie.production_companies !== null">
                    <span
                        v-for="n in movie.production_companies.length"
                        :key="`production_companies_${movie.id}_${n}`"
                    >
                        {{ movie.production_companies[n - 1].name }}{{ n < movie.production_companies.length ? ', ' : '' }}
                    </span>
                </template>
                <span v-else>N/A</span>
            </div>
        </td>
        <td
            v-show="displayedFields.indexOf('runtime') > -1"
            headers="runtime"
        >
            <div class="text-truncate app-table-cell-wrapper">
                {{ runtimeFormatted }}
            </div>
        </td>
        <td
            v-show="displayedFields.indexOf('popularity') > -1"
            headers="popularity"
        >
            <div class="text-truncate app-table-cell-wrapper">
                {{ popularityShort }}
            </div>
        </td>
        <td
            v-show="displayedFields.indexOf('vote_average') > -1"
            headers="vote_average"
        >
            <div class="text-truncate app-table-cell-wrapper">
                {{ voteAverageShort }}
            </div>
        </td>
        <td
            v-show="displayedFields.indexOf('vote_count') > -1"
            headers="vote_count"
        >
            <div class="text-truncate app-table-cell-wrapper">
                {{ voteCount }}
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
                required: true,
            },
            movie: {
                type: Object,
                required: true,
            },
        },

        computed: {
            displayedFields() {
                return this.$store.getters.getDisplayedFields;
            },

            title() {
                return this.movie.title || 'N/A';
            },

            originalTitle() {
                return this.movie.original_title || 'N/A';
            },

            tagline() {
                return this.movie.tagline || 'N/A';
            },

            overview() {
                return this.movie.overview || 'N/A';
            },

            voteCount() {
                return this.movie.vote_count || 'N/A';
            },

            originalLanguage() {
                if (this.movie.original_language === null) return null;
                let lang = this.$store.state.languages.find(lang => lang.iso_639_1 === this.movie.original_language);
                if (lang === undefined) return {
                    iso_639_1: this.movie.original_language,
                    name: this.movie.original_language,
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
                    year: 'numeric',
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
                let result = 'N/A';
                if (this.movie.runtime === null) return result;

                const minutes = Math.floor(this.movie.runtime % 60);
                result = `${minutes}min`;

                const hours = Math.floor(this.movie.runtime / 60);
                if (hours > 0) {
                    result = `${hours}h ` + result;
                }

                const secs = Math.round((this.movie.runtime % 1) * 60);
                if (secs > 0) {
                    result += ` ${secs}sec`;
                }

                return result;
            },

            voteAverageShort() {
                if (this.movie.vote_average === null) return 'N/A';
                return this.movie.vote_average.toFixed(1);
            },
        },

        methods: {
            formatNumber(num) {
                return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            },

            filter(field, argument) { //TODO доделать!
                let f = {};
                f[field] = argument;
                this.$router.push({ path: this.$route.path, query: { ...this.$route.query, ...f } });
            },
        },
    };
</script>

<style scoped>

</style>