<script setup lang="ts">
import SourceViewComponent from '@/components/SourceViewComponent.vue'
import ItemViewComponent from '@/components/ItemViewComponent.vue'
</script>

<template>
    <div class="home-navigation">
        <main class="home-navigation_item">
            <source-view-component />
        </main>

        <main id="items" class="home-navigation_item">
            <item-view-component />
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
</style>
