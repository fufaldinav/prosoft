import Vue from 'vue';
import App from './App.vue';
import store from './store';

window.axios = require('axios');

import 'bootstrap';
import './sass/main.scss';

window.App = new Vue({
  el: '#app',
  store,

  components: {
    App
  }
});
