<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
    <div class="back-button-component">
        <button @click="$router.back()">
            <font-awesome-icon icon="fa-solid fa-chevron-left" />
        </button>
    </div>
</template>

<style scoped>
.back-button-component button {
    border-radius: 50%;
    width: 50px;
    height: 50px;

    border: none;

    background-color: var(--flame);

    transition: scale 200ms ease-in-out;

    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.back-button-component button:active {
    scale: 0.9;
}

.back-button-component button svg {
    font-size: 20px;

    color: var(--jet);
}
</style>
