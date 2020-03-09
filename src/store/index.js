import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: []
  },

  mutations: {
  },

  actions: {
    async loadData({ commit }) {
      window.axios.post('http://185.185.69.80:8082/list', {
          'page': 0,
          'page_size': 10
      })
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  modules: {
  }
})
