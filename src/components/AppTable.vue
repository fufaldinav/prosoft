<template>
    <table class="table table-bordered table-striped table-sm table-responsive">
        <thead class="thead-light">
        <tr>
            <th id="number" scope="col">
                #
            </th>
            <th
                v-for="(field, key) in displayedFields"
                :key="key"
                :id="key"
                scope="col"
            >
                {{ field.name }}
            </th>
        </tr>
        </thead>
        <tbody>
        <app-movie
            v-for="(movie, n) in movies"
            :key="movie.id"
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

            displayedFields() {
                return this.$store.getters.getDisplayedFields;
            },

            movies() {
                return this.$store.state.movies;
            }
        },

        methods: {
            rowNumber(n) {
                return n + (this.currentPageNumber - 1) * 10;
            }
        }
    };
</script>

<style scoped>

</style>