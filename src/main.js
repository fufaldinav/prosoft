import Vue from 'vue';
import App from './App.vue';
import store from './store';

import 'bootstrap';
import './sass/main.scss';

new Vue({
    el: '#app',
    store,

    components: {
        App
    }
});
