import Vue from 'vue';
import App from './components/App.vue';
import store from './store';

import 'bootstrap';

import './sass/main.scss';

Object.defineProperty(Vue.prototype, '$bus', {
    get() {
        return this.$root.bus;
    }
});

window.App = new Vue({
    el: '#app',
    store,

    components: {
        App
    },

    data: {
        bus: new Vue({})
    },
});
