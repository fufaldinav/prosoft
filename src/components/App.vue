<template>
    <div id="app">
        <nav class="navbar navbar-light navbar-expand-md bg-light shadow-sm fixed-top">
            <a
                class="navbar-brand"
                href="#"
                @click.prevent="reloadPage()"
            >
                Moviepedia
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"/>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto mr-2">
                    <AppTableFieldsTogglerMenu/>
                    <li
                        v-if="filtersButtonIsShown"
                        class="nav-item"
                    >
                        <a
                            class="nav-link"
                            :class="{ disabled: loading }"
                            href="#"
                            role="button"
                            data-toggle="modal"
                            data-target="#filtersMenu"
                        >
                            Filters
                            <fa :icon="filtersIcon"/>
                        </a>
                    </li>
                </ul>
                <AppSearchPhraseForm/>
            </div>
        </nav>
        <main>
            <RouterView/>
        </main>
        <AppPaginator/>
        <AppProgressBar/>
        <AppFiltersMenu/>
    </div>
</template>

<script>
    import AppFiltersMenu from './AppFiltersMenu';
    import AppSearchPhraseForm from './AppSearchPhraseForm';
    import AppTable from './AppTable';
    import AppTableFieldsTogglerMenu from './AppTableFieldsTogglerMenu';
    import AppPaginator from './AppPaginator';
    import AppProgressBar from './AppProgressBar';
    import {faFilter} from '@fortawesome/free-solid-svg-icons';

    export default {
        name: 'App',

        data() {
            return {
                filtersButtonIsShown: false,
            };
        },

        components: {
            AppSearchPhraseForm,
            AppFiltersMenu,
            AppTable,
            AppTableFieldsTogglerMenu,
            AppPaginator,
            AppProgressBar,
        },

        computed: {
            filtersIcon() {
                return faFilter;
            },

            loading() {
                return this.$store.state.loading;
            },
        },

        methods: {
            reloadPage() {
                this.$router.go(0);
            },
        },

        watch: {
            $route(to) {
                this.filtersButtonIsShown = to.name === 'table';
            },
        },
    };
</script>

<style>
</style>
