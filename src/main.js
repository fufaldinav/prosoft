import Vue from 'vue';
import App from './components/App';
import store from './store';
import router from './router';

import 'bootstrap';

import './sass/main.scss';

Object.defineProperty(Vue.prototype, '$bus', {
    get() {
        return this.$root.bus;
    }
});

window.App = new Vue({
    store,
    router,

    data: {
        bus: new Vue({})
    },

    render: h => h(App)
}).$mount('#app');
