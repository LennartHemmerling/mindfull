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
        ></button>
    </div>
</template>

<style scoped>
.mindfull-source-component {
    display: flex;
}

.mindfull-source-component button {
    border: none;

    height: 60px;
    width: 75%;

    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;

    transition: height 200ms ease-in-out, width 200ms ease-in-out;
}

.mindfull-source-component.selected button {
    height: 100px;
    width: 100%;
}
</style>
