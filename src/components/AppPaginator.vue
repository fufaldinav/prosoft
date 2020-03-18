<template>
    <ul
        v-if="pageCount > 0"
        class="pagination mb-0"
        :class="{ disabled: loading }"
    >
        <li
            class="page-item"
            :class="{ disabled: isFirstPage }"
        >
                <span
                    v-if="isFirstPage"
                    class="page-link"
                    aria-hidden="true"
                >
                    &laquo;
                </span>
            <button
                v-else
                class="page-link"
                @click="prevPage"
            >
                <span aria-hidden="true">&laquo;</span>
            </button>
        </li>
        <li
            v-for="page in items"
            :key="page.label"
            class="page-item"
            :class="{ active: page.active, disabled: page.disable }"
        >
                <span
                    v-if="page.active"
                    class="page-link"
                    aria-hidden="true"
                >
                    {{ page.label }}
                </span>
            <span
                v-else-if="page.disable"
                class="page-link"
                aria-hidden="true"
            >
                    ...
                </span>
            <button
                v-else
                class="page-link"
                @click="changePage(page.label)"
            >
                {{ page.label }}
            </button>
        </li>
        <li
            class="page-item"
            :class="{ disabled: isLastPage }"
        >
                <span
                    v-if="isLastPage"
                    class="page-link"
                    aria-hidden="true"
                >
                    &raquo;
                </span>
            <a
                v-else
                class="page-link"
                href="#"
                @click.prevent="nextPage"
            >
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "AppPaginator",

        computed: {
            loading() {
                return this.$store.getters.loading;
            },

            dbSize() {
                return this.$store.getters.getDbSize;
            },

            pageSize() {
                return this.$store.getters.getPageSize;
            },

            pageCount() {
                return Math.ceil(this.dbSize / this.pageSize);
            },

            currentPageNumber() {
                return this.$store.getters.getCurrentPageNumber;
            },

            isFirstPage() {
                return this.currentPageNumber === 1;
            },

            isLastPage() {
                return this.currentPageNumber === this.pageCount;
            },

            items() {
                let output = [];

                if (this.pageCount < 8) {
                    for (let i = 1; i <= this.pageCount; i++) {
                        output.push({
                            label: i,
                            active: this.currentPageNumber === i
                        });
                    }

                    return output;
                }

                let valPrev = this.currentPageNumber < 3 ? (this.pageCount - 1) : (this.currentPageNumber - 1);
                let valNext = this.currentPageNumber > (this.pageCount - 2) ? 2 : (this.currentPageNumber + 1);
                let extraPrev = (this.currentPageNumber >= 4 && this.currentPageNumber < (this.pageCount - 3)) ? null : (this.isLastPage || this.currentPageNumber < 3) ? (this.pageCount - 2) : (this.pageCount - 1);
                let extraNext = (this.currentPageNumber >= 3 && this.currentPageNumber < (this.pageCount - 2)) ? null : (this.isFirstPage || this.currentPageNumber > (this.pageCount - 2)) ? 3 : 2;
                let dotsBefore = (this.currentPageNumber > 3 && this.currentPageNumber < (this.pageCount - 2)) ? (valPrev - 1) : null;
                let dotsAfter = (this.currentPageNumber > 1 && this.currentPageNumber < (this.pageCount - 2)) ? (valNext + 1) : (extraNext + 1);

                for (let i = 1; i <= this.pageCount; i++) {
                    if ([1, this.pageCount, this.currentPageNumber, valPrev, valNext, extraPrev, extraNext, dotsBefore, dotsAfter].includes(i)) {
                        output.push({
                            label: i,
                            active: this.currentPageNumber === i,
                            disable: [dotsBefore, dotsAfter].includes(i)
                        });
                    }
                }

                return output;
            }
        },

        methods: {
            changePage(pageNumber) {
                this.$store.commit('setCurrentPageNumber', pageNumber);
                window.App.$bus.$emit('PageChanged');
            },

            prevPage() {
                let pageNumber = this.currentPageNumber > 1 ? this.currentPageNumber - 1 : 1;
                this.changePage(pageNumber);
            },

            nextPage() {
                let pageNumber = this.currentPageNumber < this.pageCount ? this.currentPageNumber + 1 : this.pageCount;
                this.changePage(pageNumber);
            }
        }
    }
</script>

<style scoped>

</style>