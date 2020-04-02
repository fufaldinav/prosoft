<template>
    <div class="d-flex flex-row align-items-center h-100">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12 text-center">
                    <span class="display-1 d-block">Error</span>
                    <div class="mb-4 lead">Something was wrong. Try to reset filters or check your link.</div>
                    <router-link to="/?page=1&page_size=10">Reset filters</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AppBdError',
    };
</script>

<style scoped>

</style>