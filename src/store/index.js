import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const axios = require('axios');

export default new Vuex.Store({
    state: {
        loading: true,
        dbSize: 0,
        pageSize: 15,
        currentPageNumber: 1, //здесь и далее отсчёт страниц начинается с единицы, читай коммент в запросе
        movies: [],
        collections: [],
        companies: [],
        countries: [],
        genres: [],
        languages: [],
    },

    getters: {
        getLoadStatus: state => {
            return state.loading;
        },

        getDbSize: state => {
            return state.dbSize;
        },

        getPageSize: state => {
            return state.pageSize;
        },

        getCurrentPageNumber: state => {
            return state.currentPageNumber;
        },

        getLanguages: state => {
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

            return state.languages.sort((a, b) => {
                if (a.type < b.type) return -1;
                if (a.type > b.type) return 1;
                let sortByName = naturalCompare(a.name, b.name);
                if (sortByName !== 0) return sortByName;
                return 0;
            });
        },

        getMovies: state => {
            return state.movies;
        }
    },

    mutations: {
        setLoading(state, status) {
            state.loading = status;
        },

        setDbSize(state, size) {
            state.dbSize = size;
        },

        setPageSize(state, size) {
            state.pageSize = size;
        },

        setCurrentPageNumber(state, pageNumber) {
            state.currentPageNumber = pageNumber;
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

        addMovie(state, movie) {
            state.movies.push(movie);
        },

        clearMoviesCollection(state) {
            while (state.movies.length > 0) {
                state.movies.pop();
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

                    commit('clearMoviesCollection');

                    let data = response.data;

                    if (data.hasOwnProperty('ok') && data.ok === true) {
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
