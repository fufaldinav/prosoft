<template>
    <tr>
        <th scope="row">{{ number + 1 }}</th>
        <td>{{ movie.id }}</td>
        <td>{{ movie.title }}</td>
        <td>{{ movie.original_title }}</td>
        <td>{{ movie.release_date }}</td>
        <td>{{ movie.status }}</td>
        <td>{{ movie.production_countries }}</td>
        <td>{{ movie.tagline }}</td>
        <td>{{ movie.genres }}</td>
        <td>{{ movie.budget }}</td>
        <td>{{ movie.revenue }}</td>
        <td>{{ movie.adult }}</td>
        <td>{{ movie.belongs_to_collection }}</td>
        <td>{{ movie.homepage }}</td>
        <td>{{ movie.imdb_id }}</td>
        <td>{{ movie.original_language }}</td>
        <td>{{ movie.spoken_languages }}</td>
        <td>{{ movie.overview }}</td>
        <td>{{ movie.production_companies }}</td>
        <td>{{ movie.runtime }}</td>
        <td>{{ movie.popularity }}</td>
        <td>{{ movie.vote_averaged }}</td>
        <td>{{ movie.vote_count }}</td>
    </tr>
</template>

<script>
    export default {
        name: "AppMovie",

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
    }
</script>

<style scoped>

</style>