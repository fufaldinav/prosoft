<template>
    <div id="app">
        <header class="container-fluid px-0 app-header">
        </header>
        <main class="container-fluid px-0 app-body">
            <router-view/>
        </main>
        <footer class="container-fluid px-0 app-footer">
            <app-paginator/>
        </footer>
    </div>
</template>

<script>
    import AppTable from './AppTable';
    import AppPaginator from './AppPaginator';

    export default {
        name: 'App',

        components: { AppTable, AppPaginator },

        mounted() {
            this.$bus.$on('PageChanged', () => {
                this.$store.dispatch('loadMovies');
            });
        },

        beforeDestroy() {
            this.$bus.$off('PageChanged');
        }
    };
</script>

<style>
</style>
