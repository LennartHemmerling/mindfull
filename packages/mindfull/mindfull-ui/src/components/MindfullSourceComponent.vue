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
            <h2>{{ source.name }}</h2>

            <p>{{ source.description }}</p>
        </button>
    </div>
</template>

<style scoped>
.mindfull-source-component {
    display: flex;
    justify-content: flex-end;
}

.mindfull-source-component button {
    display: flex;
    flex-direction: column;

    border: none;

    overflow: clip;

    padding: 1rem;

    height: 60px;
    width: 70%;

    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;

    transition: padding-right 300ms ease-in-out, width 200ms ease-in-out;
}

.mindfull-source-component button h2 {
    display: flex;

    justify-content: flex-end;
    align-items: center;

    width: 100%;
    height: 100%;

    interpolate-size: allow-keywords;

    transition: width 300ms ease-in-out, height 200ms ease-in-out;
}

.mindfull-source-component button p {
    padding-top: 0.2rem;

    translate: 100vw 0;

    height: 0;

    transition: translate 200ms ease-in-out;
}

.mindfull-source-component.selected button {
    height: 100px;
    width: 100%;
}

.mindfull-source-component.selected button h2 {
    width: min-content;
    height: min-content;

    text-align: end;
}

.mindfull-source-component.selected button p {
    translate: 0 0;

    transition: translate 400ms 100ms ease-in-out;
}
</style>
