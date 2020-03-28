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
            id: { name: 'ID', shown: true },
            title: { name: 'Title', shown: true },
            original_title: { name: 'Original title', shown: true },
            release_date: { name: 'Release date', shown: true, sortable: true },
            status: { name: 'Status', shown: true, sortable: true },
            production_countries: { name: 'Countries', shown: true },
            tagline: { name: 'Tagline', shown: true },
            genres: { name: 'Genres', shown: true },
            budget: { name: 'Budget', shown: true, sortable: true },
            revenue: { name: 'Revenue', shown: true, sortable: true },
            adult: { name: 'Adult', shown: true },
            belongs_to_collection: { name: 'Collection', shown: true },
            homepage: { name: 'Homepage', shown: true },
            imdb_id: { name: 'IMDB', shown: true, sortable: true },
            original_language: { name: 'Original language', shown: true, sortable: true },
            spoken_languages: { name: 'Language', shown: true },
            overview: { name: 'Overview', shown: true },
            production_companies: { name: 'Production Co', shown: true },
            runtime: { name: 'Runtime', shown: true, sortable: true },
            popularity: { name: 'Popularity', shown: true, sortable: true },
            vote_average: { name: 'Vote average', shown: true, sortable: true },
            vote_count: { name: 'Vote count', shown: true, sortable: true },
        },
        sortField: null,
        sortOrder: 'asc',
        filters: {
            imdb_id: null,           //String - IMDB ID для поиска только одного фильма
            ids: [],                 //Integer[]
            search: null,            //String
            adult: null,             //Boolean
            budget_min: null,        //Integer
            budget_max: null,        //Integer
            genres: [],              //String[]
            original_language: null, //String
            popularity_min: null,    //Float
            popularity_max: null,    //Float
            release_date_min: null,  //String - дата в формате YYYY-MM-DD
            release_date_max: null,  //String - дата в формате YYYY-MM-DD
            revenue_min: null,       //Integer
            revenue_max: null,       //Integer
            runtime_min: null,       //Float
            runtime_max: null,       //Float
            spoken_languages: [],    //String[]
            status: null,            //String - статус выхода фильма
            vote_average_min: null,  //Float
            vote_average_max: null,  //Float
            vote_count_min: null,    //Integer
            vote_count_max: null,     //Integer
        },
        dataSize: 0,
        movies: [],
        collections: [],
        companies: [],
        countries: [],
        genres: [],
        languages: [],
        statuses: [],
    },

    getters: {
        pageCount: state => {
            return Math.ceil(state.dataSize / state.pageSize);
        },

        getDisplayedFields: state => {
            return Object.keys(state.fields).filter(key => state.fields[key].shown);
        },

        getSortableFields: state => {
            return Object.keys(state.fields).filter(key => {
                return state.fields[key].hasOwnProperty('sortable') && state.fields[key].sortable === true;
            });
        },

        getCollections: state => {
            return state.collections.sort((a, b) => {
                return naturalCompare(a.name, b.name);
            });
        },

        getCompanies: state => {
            return state.companies.sort((a, b) => {
                return naturalCompare(a.name, b.name);
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
        },
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

        setSortField(state, field) {
            state.sortField = field;
        },

        clearSortField(state) {
            state.sortField = null;
        },

        setSortOrder(state, order) {
            state.sortOrder = order;
        },

        setDataSize(state, size) {
            state.dataSize = size;
        },

        addMovie(state, movie) {
            state.movies.push(new Movie(movie));
        },

        clearMovies(state) {
            state.movies = [];
        },

        addCollection(state, collection) {
            state.collections.push(collection);
        },

        addCompany(state, company) {
            state.companies.push(company);
        },

        addCountry(state, country) {
            state.countries.push(country);
        },

        addGenre(state, genre) {
            state.genres.push(genre);
        },

        addLanguage(state, language) {
            state.languages.push(language);
        },

        addStatus(state, status) {
            state.statuses.push(status);
        },
    },

    actions: {
        async loadMovies({ commit, state }, query = {}) {
            commit('setLoading', true);

            return axios.post('http://185.185.69.80:8082/list', {
                ...query,
                page: (query.page ? query.page : state.currentPageNumber) - 1, //перед отправкой запроса причёсываем нумерацию
                page_size: query.page_size ? query.page_size : state.pageSize  //чтобы случайно не загрузить всю базу
            })
                .then(response => {
                    console.log(response.data); //TODO удалить

                    let responseData = response.data;

                    if (! 'ok' in responseData || responseData.ok !== true) {
                        throw new Error('response is not ok =((');
                    }

                    const dataSize = responseData.data_size ? responseData.data_size : 0;
                    const movies = responseData.data ? responseData.data : [];

                    if (dataSize === 0) {
                        throw new Error('no data returned');
                    }

                    if (dataSize !== state.dataSize) {
                        commit('setDataSize', dataSize);
                    }

                    if (movies.length === 0) {
                        return dataSize;
                    }

                    if (state.movies.length > 0) {
                        commit('clearMovies');
                    }

                    for (let movie of movies) {
                        if (movie.belongs_to_collection !== null) {
                            if (state.collections.find(e => e.id === movie.belongs_to_collection.id) === undefined) {
                                commit('addCollection', movie.belongs_to_collection);
                            }
                        }

                        if (movie.production_companies !== null) {
                            for (let company of movie.production_companies) {
                                if (state.companies.find(e => e.id === company.id) === undefined) {
                                    commit('addCompany', company);
                                }
                            }
                        }

                        if (movie.production_countries !== null) {
                            for (let country of movie.production_countries) {
                                if (state.countries.find(e => e.iso_3166_1 === country.iso_3166_1) === undefined) {
                                    commit('addCountry', country);
                                }
                            }
                        }

                        if (movie.genres !== null) {
                            for (let genre of movie.genres) {
                                if (state.genres.find(e => e.id === genre.id) === undefined) {
                                    commit('addGenre', genre);
                                }
                            }
                        }

                        if (movie.spoken_languages !== null) {
                            for (let language of movie.spoken_languages) {
                                if (state.languages.find(e => e.iso_639_1 === language.iso_639_1) === undefined) {
                                    commit('addLanguage', language);
                                }
                            }
                        }

                        if (state.statuses.indexOf(movie.status) === -1) {
                            commit('addStatus', movie.status);
                        }

                        commit('addMovie', movie);
                    }

                    return dataSize;
                })
                .catch(error => {
                    console.log(error); //TODO обработка ошибки загрузки
                })
                .finally(() => {
                    commit('setLoading', false);
                });
        },
    },

    modules: {},
});
