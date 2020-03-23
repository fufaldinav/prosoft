<template>
    <div id="app">
        <header class="container-fluid px-0 app-header">
        </header>
        <main class="container-fluid px-0 app-body">
            <RouterView/>
        </main>
        <footer class="container-fluid px-0 app-footer">
            <AppPaginator/>
        </footer>
    </div>
</template>

<script>
    import AppTable from './AppTable';
    import AppPaginator from './AppPaginator';

    export default {
        name: 'App',

        components: { AppTable, AppPaginator }
    };
</script>

<style>
</style>
