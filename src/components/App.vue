<template>
    <div class="container-fluid px-0">
        <app-paginator></app-paginator>
        <table class="table">
            <thead class="thead-light">
            <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th> <!-- id -->
                <th scope="col">Заголовок</th> <!-- title -->
                <th scope="col">Оригинальное название</th> <!-- original_title -->
                <th scope="col">Премьера</th> <!-- release_date -->
                <th scope="col">Статус</th> <!-- status -->
                <th scope="col">Страна</th> <!-- production_countries -->
                <th scope="col">Слоган</th> <!-- tagline -->
                <th scope="col">Жанр</th> <!-- genres -->
                <th scope="col">Бюджет</th> <!-- budget -->
                <th scope="col">Сборы</th> <!-- revenue -->
                <th scope="col">18+</th> <!-- adult -->
                <th scope="col">Коллекции</th> <!-- belongs_to_collection -->
                <th scope="col">Сайт</th> <!-- homepage -->
                <th scope="col">IMDB</th> <!-- imdb_id -->
                <th scope="col">Оригинальная озвучка</th> <!-- original_language -->
                <th scope="col">Языки</th> <!-- spoken_languages -->
                <th scope="col">Описание</th> <!-- overview -->
                <th scope="col">Киностудии</th> <!-- production_companies -->
                <th scope="col">Длительность</th> <!-- runtime -->
                <th scope="col">Популярность</th> <!-- popularity -->
                <th scope="col">Рейтинг</th> <!-- vote_average -->
                <th scope="col">Голосов отдано</th> <!-- vote_count -->
            </tr>
            </thead>
            <tbody>
            <app-movie
                v-for="(movie, number) in movies"
                :key="movie.id"
                :number="number"
                :movie="movie"
            >
            </app-movie>
            </tbody>
        </table>
    </div>
</template>

<script>
    import AppMovie from './AppMovie.vue';
    import AppPaginator from './AppPaginator.vue';

    export default {
        name: "App",

        components: { AppMovie, AppPaginator },

        computed: {
            movies() {
                return this.$store.getters.getMovies;
            }
        },

        mounted() {
            this.$store.dispatch('loadMovies');
        }
    };
</script>

<style>
</style>
