import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import AppTable from '../components/AppTable';

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;

Vue.use(Router);

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

    let pageNumber = to.query.page ? parseInt(to.query.page, 10) : DEFAULT_PAGE_NUMBER;
    if (! pageNumber) {
        hasErrors = true;
    } else if (pageNumber < 1) {
        pageNumber = 1;
    }
    if (pageNumber !== store.state.currentPageNumber) {
        store.commit('setCurrentPageNumber', pageNumber);
    }

    let pageSize = to.query.page_size ? parseInt(to.query.page_size, 10) : DEFAULT_PAGE_SIZE;
    if (! pageSize || ! store.state.availablePageSizes.includes(pageSize)) {
        hasErrors = true;
    }
    if (pageSize !== store.state.pageSize) {
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