import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const axios = require('axios');

export default new Vuex.Store({
    state: {
        dbSize: 0,
        pageSize: 15,
        currentPageNumber: 1, //здесь и далее отсчёт страниц начинается с единицы, читай коммент в запросе
        movies: [],
        companies: {},
        countries: {},
        genres: {},
        languages: {},
    },

    getters: {
        getDbSize: state => {
            return state.dbSize;
        },

        getPageSize: state => {
            return state.pageSize;
        },

        getCurrentPageNumber: state => {
            return state.currentPageNumber;
        },

        getMovies: state => {
            return state.movies;
        }
    },

    mutations: {
        setDbSize(state, size) {
            state.dbSize = size;
        },

        setPageSize(state, size) {
            state.pageSize = size;
        },

        setCurrentPageNumber(state, pageNumber) {
            state.currentPageNumber = pageNumber;
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
        async loadMovies({ commit, state }, pageNumber = 1) {
            axios.post('http://185.185.69.80:8082/list', {
                'page': pageNumber - 1, //перед отправкой запроса причёсываем нумерацию
                'page_size': state.pageSize
            })
                .then(response => {
                    let data = response.data;

                    if (data.hasOwnProperty('ok') && data.ok === true) {
                        commit('setDbSize', data.data_size);

                        for (let movie of data.data) {
                            commit('addMovie', movie);
                        }
                    }

                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },

    modules: {}
});
