<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const route = useRoute()

const sourceIndex = computed(() => {
    const source = route.params['source']

    return source !== '' ? Number(source) : 0
})

const extended = ref(false)
</script>

<template>
    <div class="toolbar-component">
        <transition name="toolbar-component_actions-transition">
            <div v-if="extended" class="toolbar-component_actions">
                <button @click="console.log('clicked settings')">
                    <font-awesome-icon icon="fa-solid fa-cog" />
                </button>

                <button @click="$router.push(`/add-item/${sourceIndex}`)">
                    <font-awesome-icon icon="fa-solid fa-plus" />
                </button>
            </div>
        </transition>

        <div class="toolbar-component_toggle">
            <button
                :class="extended ? 'extended' : ''"
                @click="extended = !extended"
            >
                <transition
                    name="toolbar-component_toggle-transition"
                    mode="out-in"
                >
                    <font-awesome-icon
                        v-if="!extended"
                        icon="fa-solid fa-pen"
                    />

                    <font-awesome-icon v-else icon="fa-solid fa-xmark" />
                </transition>
            </button>
        </div>
    </div>
</template>

<style scoped>
.toolbar-component {
    display: grid;
    grid-template-areas: 'actions toggle';
    grid-template-columns: auto auto;
    gap: 25px;
}

.toolbar-component button {
    border-radius: 50%;
    width: 50px;
    height: 50px;

    border: none;

    background-color: var(--seasalt);

    transition: scale 200ms ease-in-out;

    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.toolbar-component button:active {
    scale: 0.9;
}

.toolbar-component button svg {
    font-size: 20px;

    color: var(--jet);
}

.toolbar-component_actions {
    grid-area: actions;

    display: grid;
    grid-auto-columns: 50px;
    grid-auto-flow: column;
    gap: 15px;
}

.toolbar-component_actions-transition-enter-active,
.toolbar-component_actions-transition-leave-active {
    transition: translate 150ms ease-in-out, opacity 150ms 20ms ease-in-out;
}

.toolbar-component_actions-transition-enter-from,
.toolbar-component_actions-transition-leave-to {
    translate: 50px 0;
    opacity: 0;
}

.toolbar-component_toggle {
    grid-area: toggle;

    z-index: 1;
}

.toolbar-component_toggle button {
    background-color: var(--seasalt);

    transition: background-color 200ms ease-in-out;
}

.toolbar-component_toggle button.extended {
    background-color: var(--flame);
}

.toolbar-component_toggle-transition-enter-active,
.toolbar-component_toggle-transition-leave-active {
    transition: rotate 150ms ease-in-out, scale 150ms ease-in-out;
}

.toolbar-component_toggle-transition-enter-from,
.toolbar-component_toggle-transition-leave-to {
    rotate: 180deg;
    scale: 0;
}
</style>
