import Vue from 'vue';
import App from './components/App.vue';
import store from './store';

import './sass/main.scss';

new Vue({
    el: '#app',
    store,

    components: {
        App
    }
});
