<script setup lang="ts">
import { defineProps } from 'vue'
import colorTheme from '../assets/colorTheme'
import type { MindfullSource } from 'mindfull-types'

const props = defineProps<{
    source: MindfullSource
    selected: boolean
    clickSource: (sourceIndex: number) => void
}>()
</script>

<template>
    <div
        :class="`mindfull-source-component ${props.selected ? 'selected' : ''}`"
    >
        <button
            :class="`${colorTheme(props.source.sourceIndex, 2).container} ${
                colorTheme(props.source.sourceIndex, 2).text
            }`"
            @click="props.clickSource(props.source.sourceIndex)"
        >
            <div v-if="props.selected">
                <h2>{{ source.name }}</h2>

                <p>{{ source.description }}</p>
            </div>
        </button>
    </div>
</template>

<style scoped>
.mindfull-source-component {
    display: flex;
}

.mindfull-source-component button {
    pointer-events: all;

    text-align: start;

    border: none;

    height: 60px;
    width: 2.5rem;

    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.mindfull-source-component button div {
    width: 90vw;

    display: flex;
    flex-direction: column;

    gap: 1rem;
    padding: 1rem;

    overflow: clip;
}

.mindfull-source-component.selected button {
    border-top-right-radius: 0px;

    height: 100px;
    width: calc(100vw - 1rem);

    animation: get-selected-anim 700ms ease;
}

@keyframes get-selected-anim {
    from {
        border-top-right-radius: 10px;

        height: 60px;
        width: 2.5rem;
    }
    50% {
        height: 100px;
        width: calc(100vw - 1rem);
    }

    to {
        border-top-right-radius: 0px;
    }
}
</style>
