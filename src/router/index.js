import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

Vue.use(Router);

import AppTable from '../components/AppTable';

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'table',
            component: AppTable
        }
    ]
});

router.beforeEach((to, from, next) => {
    let hasErrors = false;
    const pageNumber = to.query.page ? parseInt(to.query.page, 10) : 1;
    const pageSize = to.query.page_size ? parseInt(to.query.page_size, 10) : 10;

    if (! pageNumber || pageNumber < 1) {
        hasErrors = true;
    } else if (pageNumber !== store.state.currentPageNumber) {
        store.commit('setCurrentPageNumber', pageNumber);
    }

    if (! pageSize || ! store.state.availablePageSizes.includes(pageSize)) {
        hasErrors = true;
    } else if (pageSize !== store.state.pageSize) {
        store.commit('setPageSize', pageSize);
    }

    if (hasErrors) {
        next(false);
    } else {
        store.dispatch('loadMovies');
        next();
    }
});

export default router;