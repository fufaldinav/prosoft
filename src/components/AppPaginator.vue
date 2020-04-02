<template>
    <div
        v-if="pageCount > 0"
        class="app-paginator btn-group mb-0 border rounded shadow"
        role="group" aria-label="Pagination"
    >
        <div class="btn-group dropup" role="group">
            <button id="pageManualSelect" type="button" class="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Page
            </button>
            <div class="dropdown-menu p-3" aria-labelledby="pageManualSelect">
                <div class="form-group">
                    <label for="pageNumberForm">Chose page:</label>
                    <input
                        id="pageNumberForm"
                        type="number"
                        class="form-control"
                        v-model="pageInputFormData"
                        min="1"
                        :max="pageCount"
                        :placeholder="currentPageNumber"
                    >
                </div>
                <button
                    type="button"
                    class="btn btn-primary"
                    :disabled="pageInputFormData < 1 || pageInputFormData > pageCount"
                    @click="changePage(pageInputFormData)"
                >
                    Let's go
                </button>
            </div>
        </div>
        <button
            type="button"
            class="btn btn-light"
            :disabled="isFirstPage || loading"
            @click="prevPage"
        >
            &laquo;
        </button>
        <template
            v-for="page in items"
        >
            <button
                v-if="page.active"
                :key="`page_item_${page.label}`"
                type="button"
                class="btn btn-primary"
                :disabled="loading"
            >
                {{ page.label }}
            </button>
            <button
                v-else-if="page.disable"
                :key="`page_item_${page.label}`"
                type="button"
                class="btn btn-light"
                :disabled="loading"
            >
                ...
            </button>
            <button
                v-else
                :key="`page_item_${page.label}`"
                type="button"
                class="btn btn-light"
                :disabled="loading"
                @click="changePage(page.label)"
            >
                {{ page.label }}
            </button>
        </template>
        <button
            class="btn btn-light"
            :disabled="isLastPage || loading"
            @click.prevent="nextPage"
        >
            &raquo;
        </button>
    </div>
</template>

<script>
    export default {
        name: 'AppPaginator',

        data() {
            return {
                pageInputFormData: this.currentPageNumber,
            };
        },

        computed: {
            loading() {
                return this.$store.state.loading;
            },

            pageCount() {
                return this.$store.getters.pageCount;
            },

            currentPageNumber() {
                return this.$store.state.currentPageNumber;
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
                            active: this.currentPageNumber === i,
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
                            disable: [dotsBefore, dotsAfter].includes(i),
                        });
                    }
                }

                return output;
            },
        },

        methods: {
            changePage(pageNumber) {
                this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page: pageNumber } });
            },

            prevPage() {
                let pageNumber = this.currentPageNumber > 1 ? this.currentPageNumber - 1 : 1;
                this.changePage(pageNumber);
            },

            nextPage() {
                let pageNumber = this.currentPageNumber < this.pageCount ? this.currentPageNumber + 1 : this.pageCount;
                this.changePage(pageNumber);
            },
        },
    };
</script>

<style scoped>

</style>