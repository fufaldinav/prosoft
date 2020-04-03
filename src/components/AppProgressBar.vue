<template>
    <div class="position-fixed w-100 d-flex justify-content-center app-progressbar-wrapper mx-auto">
        <transition name="slide-fade">
            <div
                v-show="loading"
                class="progress w-25 border border-primary shadow app-progressbar"
            >
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                    Loading...
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'AppProgressBar',

        computed: {
            loading() {
                return this.$store.state.loading;
            },
        },
    };
</script>

<style scoped>

</style>