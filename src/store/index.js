import Vue from 'vue';
import Vuex from 'vuex';
import {Movie} from './movie';

Vue.use(Vuex);

const axios = require('axios');

function naturalCompare(a, b) {
    let ax = [], bx = [];

    a.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
        ax.push([$1 || Infinity, $2 || '']);
    });
    b.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
        bx.push([$1 || Infinity, $2 || '']);
    });

    while (ax.length && bx.length) {
        let an = ax.shift();
        let bn = bx.shift();
        let nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
        if (nn) return nn;
    }

    return ax.length - bx.length;
}

export default new Vuex.Store({
    state: {
        loading: true,
        currentPageNumber: 1, //здесь и далее отсчёт страниц начинается с единицы, читай коммент в запросе
        pageSize: 10,
        availablePageSizes: [0, 10, 25, 50, 100, 250, 500], //доступные "размеры" страниц
        fields: {
            'id': { 'name': 'ID', 'shown': true, 'sortable': false },
            'title': { 'name': 'Title', 'shown': true, 'sortable': false },
            'original_title': { 'name': 'Original title', 'shown': true, 'sortable': false },
            'release_date': { 'name': 'Release date', 'shown': true, 'sortable': true },
            'status': { 'name': 'Status', 'shown': true, 'sortable': true },
            'production_countries': { 'name': 'Countries', 'shown': true, 'sortable': false },
            'tagline': { 'name': 'Tagline', 'shown': true, 'sortable': false },
            'genres': { 'name': 'Genres', 'shown': true, 'sortable': false },
            'budget': { 'name': 'Budget', 'shown': true, 'sortable': true },
            'revenue': { 'name': 'Revenue', 'shown': true, 'sortable': true },
            'adult': { 'name': 'Adult', 'shown': true, 'sortable': false },
            'belongs_to_collection': { 'name': 'Collection', 'shown': true, 'sortable': false },
            'homepage': { 'name': 'Homepage', 'shown': true, 'sortable': false },
            'imdb_id': { 'name': 'IMDB', 'shown': true, 'sortable': true },
            'original_language': { 'name': 'Original language', 'shown': true, 'sortable': true },
            'spoken_languages': { 'name': 'Language', 'shown': true, 'sortable': false },
            'overview': { 'name': 'Overview', 'shown': true, 'sortable': false },
            'production_companies': { 'name': 'Production Co', 'shown': true, 'sortable': false },
            'runtime': { 'name': 'Runtime', 'shown': true, 'sortable': true },
            'popularity': { 'name': 'Popularity', 'shown': true, 'sortable': true },
            'vote_average': { 'name': 'Vote average', 'shown': true, 'sortable': true },
            'vote_count': { 'name': 'Vote count', 'shown': true, 'sortable': true }
        },
        sortField: null,
        sortOrder: 'asc',
        filters: {
            'imdb_id': null,           //String - IMDB ID для поиска только одного фильма
            'ids': null,               //Integer[]
            'search': null,            //String
            'adult': null,             //Boolean
            'budget_min': null,        //Integer
            'budget_max': null,        //Integer
            'genres': null,            //String[]
            'original_language': null, //String
            'popularity_min': null,    //Float
            'popularity_max': null,    //Float
            'release_date_min': null,  //String - дата в формате YYYY-MM-DD
            'release_date_max': null,  //String - дата в формате YYYY-MM-DD
            'revenue_min': null,       //Integer
            'revenue_max': null,       //Integer
            'runtime_min': null,       //Float
            'runtime_max': null,       //Float
            'spoken_languages': null,  //String[]
            'status': null,            //String - статус выхода фильма
            'vote_average_min': null,  //Float
            'vote_average_max': null,  //Float
            'vote_count_min': null,    //Integer
            'vote_count_max': null     //Integer
        },
        dbSize: 0,
        movies: [],
        collections: [],
        companies: [],
        countries: [],
        genres: [],
        languages: [],
        statuses: []
    },

    getters: {
        pageCount: state => {
            return Math.ceil(state.dbSize / state.pageSize);
        },

        getDisplayedFields: state => {
            return Object.keys(state.fields)
                .filter(key => state.fields[key].shown)
                .reduce((obj, key) => {
                    obj[key] = state.fields[key];
                    return obj;
                }, {});
        },

        getCollections: state => {
            return state.collections.sort((a, b) => {
                return naturalCompare(a, b);
            });
        },

        getCompanies: state => {
            return state.companies.sort((a, b) => {
                return naturalCompare(a, b);
            });
        },

        getCountries: state => {
            return state.countries.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
        },

        getGenres: state => {
            return state.genres.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
        },

        getLanguages: state => {
            return state.languages.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
        },

        getStatuses: state => {
            return state.statuses.sort((a, b) => {
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            });
        }
    },

    mutations: {
        setLoading(state, status) {
            state.loading = status;
        },

        setCurrentPageNumber(state, pageNumber) {
            state.currentPageNumber = pageNumber;
        },

        setPageSize(state, size) {
            state.pageSize = size;
        },

        setDbSize(state, size) {
            state.dbSize = size;
        },

        addMovie(state, movie) {
            state.movies.push(new Movie(movie));
        },

        clearMovies(state) {
            while (state.movies.length > 0) {
                state.movies.pop();
            }
        },

        addCollection(state, collection) {
            if (state.collections.indexOf(collection) === -1) {
                state.collections.push(collection);
            }
        },

        addCompany(state, company) {
            if (state.companies.indexOf(company) === -1) {
                state.companies.push(company);
            }
        },

        addCountry(state, country) {
            if (state.countries.indexOf(country) === -1) {
                state.countries.push(country);
            }
        },

        addGenre(state, genre) {
            if (state.genres.indexOf(genre) === -1) {
                state.genres.push(genre);
            }
        },

        addLanguage(state, language) {
            if (state.languages.indexOf(language) === -1) {
                state.languages.push(language);
            }
        },

        addStatus(state, status) {
            if (state.statuses.indexOf(status) === -1) {
                state.statuses.push(status);
            }
        }
    },

    actions: {
        async loadMovies({ commit, state }, filter = []) {
            commit('setLoading', true);

            axios.post('http://185.185.69.80:8082/list', {
                'page': state.currentPageNumber - 1, //перед отправкой запроса причёсываем нумерацию
                'page_size': state.pageSize,
                ...filter
            })
                .then(response => {
                    console.log(response.data); //TODO удалить

                    commit('clearMovies');

                    let data = response.data;

                    if ('ok' in data && data.ok === true) {
                        commit('setDbSize', data.data_size);

                        for (let movie of data.data) {
                            if (movie.belongs_to_collection !== null) {
                                commit('addCollection', movie.belongs_to_collection);
                            }

                            if (movie.production_companies !== null) {
                                for (let company of movie.production_companies) {
                                    commit('addCompany', company);
                                }
                            }

                            if (movie.production_countries !== null) {
                                for (let country of movie.production_countries) {
                                    commit('addCountry', country);
                                }
                            }

                            if (movie.genres !== null) {
                                for (let genre of movie.genres) {
                                    commit('addGenre', genre);
                                }
                            }

                            if (movie.spoken_languages !== null) {
                                for (let language of movie.spoken_languages) {
                                    commit('addLanguage', language);
                                }
                            }

                            commit('addMovie', movie);
                        }
                    }

                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    commit('setLoading', false);
                });
        }
    },

    modules: {}
});
