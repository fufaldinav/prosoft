<template>
    <div
        v-if="true"
        class="d-flex flex-row align-items-center h-100"
    >
        <div class="container">
            <div class="justify-content-center text-center text-secondary">
                <fa :icon="syncIcon" size="4x" spin/>
            </div>
        </div>
    </div>
</template>

<script>
    import {faSync} from '@fortawesome/free-solid-svg-icons';

    export default {
        name: 'AppProgressBar',

        computed: {
            syncIcon() {
                return faSync;
            },
        },
    };
</script>

<style scoped>

</style>