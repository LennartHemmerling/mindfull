<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import SourceViewComponent from '@/components/SourceViewComponent.vue'
import ItemViewComponent from '@/components/ItemViewComponent.vue'
import mindfullStore from '@/store/mindfullStore'

const route = useRoute()

const entry = computed(() => {
    const source = route.params['source']

    const sourceIndex = source !== '' ? Number(source) : 0

    return mindfullStore.find(
        ({ source }) => source.sourceIndex === sourceIndex
    )
})
</script>

<template>
    <div class="home-navigation">
        <main class="home-navigation_item">
            <source-view-component :entry="entry" />

            <div class="source-top-margin">
                <template v-for="storeEntry in mindfullStore">
                    <item-view-component
                        v-if="storeEntry === entry"
                        :entry="entry"
                    />
                </template>
            </div>
        </main>

        <main id="items" class="home-navigation_item"></main>
    </div>
</template>

<style scoped>
.home-navigation {
    display: grid;

    grid-template-columns: 100vw 100vw;
    grid-template-rows: 100vh;

    overflow-x: scroll;
    scroll-snap-type: x mandatory;
}

.home-navigation .home-navigation_item {
    scroll-snap-align: center;

    overflow-x: clip;
    overflow-y: auto;
}

.source-top-margin {
    margin-top: 100px;
}
</style>
