<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import SourceViewComponent from '@/components/SourceViewComponent.vue'
import ItemViewComponent from '@/components/ItemViewComponent.vue'

const route = useRoute()

const sourceIndex = computed(() => {
    const source = route.params['source']

    return source !== '' ? Number(source) : 0
})
</script>

<template>
    <div class="home-navigation">
        <main class="home-navigation_item">
            <h1>mindfull</h1>

            <source-view-component :source-index="sourceIndex" />
        </main>

        <main id="items" class="home-navigation_item">
            <item-view-component :source-index="sourceIndex" />
        </main>

        <main class="home-navigation_item"></main>
    </div>
</template>

<style scoped>
.home-navigation {
    display: grid;

    grid-template-columns: 100vw 100vw 100vw;
    grid-template-rows: 100vh;

    overflow-x: scroll;
    scroll-snap-type: x mandatory;
}

.home-navigation .home-navigation_item {
    scroll-snap-align: center;

    overflow-x: clip;
    overflow-y: auto;
}

h1 {
    color: var(--seasalt);

    padding: 1.5rem;
}
</style>
