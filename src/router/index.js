import Vue from 'vue';
import Router from 'vue-router';
import AppTable from '../components/AppTable';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'table',
            component: AppTable
        }
    ]
});

export default router;