<script setup lang="ts">
import ItemViewComponent from '@/components/ItemViewComponent.vue'
</script>

<template>
    <div class="home-navigation">
        <div class="home-navigation_item"></div>

        <div id="items" class="home-navigation_item">
            <item-view-component />
        </div>

        <div class="home-navigation_item"></div>
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
}
</style>
