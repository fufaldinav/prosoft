<template>
    <div id="app">
        <header class="container-fluid px-0 app-header">
            <nav class="navbar navbar-expand-lg navbar-light bg-light pt-1 app-navbar">
                <a
                    class="navbar-brand"
                    href="#"
                    @click.prevent="reloadPage()"
                >
                    Moviepedia
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle filters">
                    <span class="navbar-toggler-icon"/>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle app-toggle-fields-menu-icon"
                                :class="hiddenFields.length === 0 ? 'text-secondary' : 'text-danger'"
                                href="#"
                                id="fieldsDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <fa
                                    v-if="hiddenFields.length === 0"
                                    :icon="eyeIcon"
                                />
                                <fa
                                    v-else
                                    :icon="eyeSlashIcon"
                                />
                            </a>
                            <div class="dropdown-menu" aria-labelledby="fieldsDropdown">
                                <a
                                    v-for="(field, fieldName) in fields"
                                    :key="`hidden_field_${fieldName}`"
                                    class="dropdown-item d-flex"
                                    href="#"
                                    @click.prevent="toggleField(fieldName)"
                                >
                                    <span class="mr-auto">
                                        {{ field.name }}
                                    </span>
                                    <span
                                        class="ml-2"
                                        :class="field.shown === true ? 'text-success' : 'text-danger'"
                                    >
                                        <fa
                                            v-if="field.shown === true"
                                            :icon="eyeIcon"
                                        />
                                        <fa
                                            v-else
                                            :icon="eyeSlashIcon"
                                        />
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
                    </ul>
                    <ul class="navbar-nav mr-2">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="filtersDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <fa :icon="filterIcon"/>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="filtersDropdown">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Reset all</a>
                            </div>
                        </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <input
                            v-model="searchPhrase"
                            class="form-control mr-sm-2"
                            type="search"
                            placeholder="Phrase from the movie"
                            aria-label="Phrase search"
                        >
                        <button
                            class="btn btn-success my-2 my-sm-0"
                            type="button"
                            :disabled="searchPhrase === '' || searchPhrase === null"
                            @click="phraseSearch()"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </nav>
        </header>
        <main class="container-fluid px-0 app-body">
            <RouterView/>
        </main>
        <AppPaginator/>
    </div>
</template>

<script>
    import AppTable from './AppTable';
    import AppPaginator from './AppPaginator';
    import {faFilter, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

    export default {
        name: 'App',

        data() {
            return {
                searchPhrase: null,
            };
        },

        components: { AppTable, AppPaginator },

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
                    this.$store.commit('showField', fieldName);
                }
            },
        },
    };
</script>

<style>
</style>
