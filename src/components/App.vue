<template>
    <div id="app">
        <header>
            <nav class="navbar navbar-light navbar-expand-lg bg-light shadow-sm fixed-top">
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
                    <ul class="navbar-nav mr-auto">
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
                                <fa
                                    v-if="hasHiddenFields"
                                    :icon="eyeSlashIcon"
                                />
                                <fa
                                    v-else
                                    :icon="eyeIcon"
                                />
                            </a>
                            <div class="dropdown-menu" aria-labelledby="fieldsDropdown">
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
                            class="form-control mr-sm-2 app-phrase-search-input"
                            type="search"
                            placeholder="phrase from movie..."
                            aria-label="Search"
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
        <main>
            <RouterView/>
        </main>
        <AppPaginator/>
        <AppProgressBar/>
    </div>
</template>

<script>
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

        components: { AppTable, AppPaginator, AppProgressBar },

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
