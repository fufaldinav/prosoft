<template>
    <div class="d-flex flex-row align-items-center h-100">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12 text-center">
                    <span class="display-1 d-block">Error</span>
                    <div class="mb-4 lead">Something was wrong. Try to reset filters or check your link.</div>
                    <router-link to="/">Reset filters and go back</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AppBdError',

        beforeRouteEnter(to, from, next) {
            if (from.name !== 'table') {
                next('/');
            } else {
                next();
            }
        },
    };
</script>

<style scoped>

</style>