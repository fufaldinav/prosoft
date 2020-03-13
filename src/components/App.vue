<template>
    <div>
        <div class="container-fluid px-0 app-header">
        </div>
        <div class="container-fluid px-0 app-body">
            <table class="table table-bordered table-striped table-sm table-responsive">
                <thead class="thead-light">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th> <!-- id -->
                    <th scope="col">Title</th> <!-- title -->
                    <th scope="col">Original title</th> <!-- original_title -->
                    <th scope="col">Release date</th> <!-- release_date -->
                    <th scope="col">Satus</th> <!-- status -->
                    <th scope="col">Countries</th> <!-- production_countries -->
                    <th scope="col">Tagline</th> <!-- tagline -->
                    <th scope="col">Genres</th> <!-- genres -->
                    <th scope="col">Budget</th> <!-- budget -->
                    <th scope="col">Revenue</th> <!-- revenue -->
                    <th scope="col">18+</th> <!-- adult -->
                    <th scope="col">Collection</th> <!-- belongs_to_collection -->
                    <th scope="col">Homepage</th> <!-- homepage -->
                    <th scope="col">IMDB</th> <!-- imdb_id -->
                    <th scope="col">Original language</th> <!-- original_language -->
                    <th scope="col">Language</th> <!-- spoken_languages -->
                    <th scope="col">Overview</th> <!-- overview -->
                    <th scope="col">Production Co</th> <!-- production_companies -->
                    <th scope="col">Runtime</th> <!-- runtime -->
                    <th scope="col">Popularity</th> <!-- popularity -->
                    <th scope="col">Vote average</th> <!-- vote_average -->
                    <th scope="col">Voute count</th> <!-- vote_count -->
                </tr>
                </thead>
                <tbody>
                <app-movie
                    v-for="(movie, n) in movies"
                    :key="movie.id"
                    :number="n"
                    :movie="movie"
                >
                </app-movie>
                </tbody>
            </table>
        </div>
        <div class="container-fluid px-0 app-footer">
            <app-paginator></app-paginator>
        </div>
    </div>
</template>

<script>
    import AppMovie from './AppMovie.vue';
    import AppPaginator from './AppPaginator.vue';

    export default {
        name: "App",

        components: { AppMovie, AppPaginator },

        computed: {
            languages() {
                return this.$store.getters.getLanguages;
            },

            movies() {
                return this.$store.getters.getMovies;
            }
        },

        mounted() {
            this.$store.dispatch('loadMovies');

            this.$bus.$on('PageChanged', () => {
                this.$store.dispatch('loadMovies');
            })
        },

        beforeDestroy() {
            this.$bus.$off('PageChanged');
        }
    };
</script>

<style>
</style>
