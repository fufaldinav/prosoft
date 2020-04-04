<template>
    <div id="app">
        <nav class="navbar navbar-light navbar-expand-md bg-light shadow-sm fixed-top">
            <a
                class="navbar-brand"
                href="#"
                @click.prevent="reloadPage()"
            >
                Moviepedia //TODO фильтр даты выхода
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"/>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto mr-2">
                    <li class="nav-item dropdown">
                        <a
                            id="fieldsDropdown"
                            class="nav-link dropdown-toggle app-toggle-fields-menu-icon"
                            :class="hasHiddenFields ? 'text-danger' : 'text-secondary'"
                            role="button"
                            href="#"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Fields
                            <fa :icon="hasHiddenFields ? eyeSlashIcon : eyeIcon"/>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="fieldsDropdown">
                            <a
                                v-for="(field, fieldName) in fields"
                                :key="`hidden_field_${fieldName}`"
                                class="dropdown-item d-flex"
                                href="#"
                                @click.prevent.stop="toggleField(fieldName)"
                            >
                        <span class="mr-auto">
                            {{ field.title }}
                        </span>
                                <span
                                    class="ml-2"
                                    :class="field.shown === true ? 'text-success' : 'text-danger'"
                                >
                            <fa :icon="field.shown === true ? eyeIcon : eyeSlashIcon"/>
                        </span>
                            </a>
                            <div class="dropdown-divider"></div>
                            <a
                                class="dropdown-item"
                                href="#"
                                @click.prevent="showAllFields()"
                            >
                                Show all
                            </a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" role="button" data-toggle="modal" data-target="#filtersMenu">
                            Filters
                            <fa :icon="filterIcon"/>
                        </a>
                    </li>
                </ul>
                <form class="form-inline">
                    <input
                        v-model="searchPhrase"
                        class="form-control form-control-sm mr-sm-2 app-phrase-search-input"
                        type="search"
                        placeholder="phrase from movie..."
                        aria-label="Search"
                    >
                    <button
                        class="btn btn-sm btn-success my-2 my-sm-0"
                        type="button"
                        :disabled="searchPhrase === '' || searchPhrase === null"
                        @click="phraseSearch()"
                    >
                        Search
                    </button>
                </form>
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
    import AppTable from './AppTable';
    import AppPaginator from './AppPaginator';
    import AppProgressBar from './AppProgressBar';
    import {faFilter, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

    export default {
        name: 'App',

        data() {
            return {
                searchPhrase: null,
            };
        },

        components: { AppFiltersMenu, AppTable, AppPaginator, AppProgressBar },

        computed: {
            filterIcon() {
                return faFilter;
            },

            eyeIcon() {
                return faEye;
            },

            eyeSlashIcon() {
                return faEyeSlash;
            },

            fields() {
                return this.$store.state.fields;
            },

            hiddenFields() {
                return this.$store.getters.getHiddenFields;
            },

            hasHiddenFields() {
                return this.hiddenFields.length > 0;
            },
        },

        methods: {
            reloadPage() {
                this.$router.go(0);
            },

            phraseSearch() {
                this.$router.push({
                    path: this.$route.path,
                    query: { ...this.$route.query, search: this.searchPhrase },
                });
            },

            toggleField(fieldName) {
                if (this.fields[fieldName].shown === true) {
                    this.$store.commit('hideField', fieldName);
                } else {
                    this.$store.commit('showField', fieldName);
                }
            },

            showAllFields() {
                for (let fieldName of this.hiddenFields) {
                    if (this.fields[fieldName].shown !== true) {
                        this.$store.commit('showField', fieldName);
                    }
                }
            },
        },
    };
</script>

<style>
</style>
