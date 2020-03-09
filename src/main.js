import Vue from 'vue'
import App from './App.vue'
import store from './store'

window.axios = require('axios')

window.App = new Vue({
  el: '#app',
  store,

  components: {
    App
  }
})
