<template>
    <div id="saved" class="saved-container">
        <h1>Saved listings</h1>
        <div v-if="listings.length" class="listing-summaries">

        </div>
        <div v-else>No saved listings.</div>
    </div>
</template>
<script>

    export default {
        computed: {
            listings() {
                return this.$store.state.listing_summaries.filter(
                    item => this.$store.state.saved.indexOf(item.id) > -1
                );
            }
        },
        components: {
        }
    }
</script>
<style>
    #saved .listing-summaries {
        display: flex;
        flex-wrap: wrap;
        justify-content: left;
        overflow: hidden;
    }

    #saved .listing-summaries .listing-summary {
        padding-bottom: 30px;
    }

    .listing-summaries > .listing-summary {
        margin-right: 15px;
    }
</style>
