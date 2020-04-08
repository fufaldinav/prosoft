<template>
    <li
        v-if="shown"
        class="nav-item dropdown"
    >
        <a
            id="pageSizeDropdown"
            class="nav-link dropdown-toggle"
            role="button"
            href="#"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
        >
            Page size: {{ pageSize }}
        </a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="pageSizeDropdown">
            <a
                v-for="size of availablePageSizes"
                :key="`page_size_${size}`"
                class="dropdown-item"
                :class="{ 'text-primary disabled': size === pageSize }"
                href="#"
                @click.prevent="setPageSize(size)"
            >
                {{ size }}
            </a>
            <div class="dropdown-divider"></div>
            <a
                class="dropdown-item"
                href="#"
            >
                Show all
            </a>
        </div>
    </li>
</template>

<script>

    export default {
        name: 'AppTablePageSizeMenu',

        data() {
            return {
                shown: false,
            };
        },

        computed: {
            loading() {
                return this.$store.state.loading;
            },

            pageSize() {
                return this.$store.state.pageSize;
            },

            availablePageSizes() {
                return this.$store.state.availablePageSizes;
            },
        },

        methods: {
            setPageSize(size) {
                this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page_size: size } });
            },
        },

        watch: {
            $route(to) {
                this.shown = to.name === 'table';
            },
        },
    };
</script>

<style scoped>

</style>