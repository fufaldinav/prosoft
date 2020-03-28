import Vue from 'vue';
import App from './components/App';
import store from './store';
import router from './router';

import 'bootstrap';
import './sass/main.scss';

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');
