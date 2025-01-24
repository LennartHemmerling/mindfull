<script setup lang="ts">
import { defineProps } from 'vue'
import colorTheme from '../assets/colorTheme'

const props = defineProps<{
    sourceIndex: number
    selected: boolean
    clickSource: (sourceIndex: number) => void
}>()
</script>

<template>
    <div
        :class="`mindfull-source-component ${props.selected ? 'selected' : ''}`"
    >
        <button
            :class="`${colorTheme(props.sourceIndex, 2).container} ${
                colorTheme(props.sourceIndex, 2).text
            }`"
            @click="props.clickSource(props.sourceIndex)"
        >
            <h2>SOURCE</h2>
        </button>
    </div>
</template>

<style scoped>
.mindfull-source-component {
    display: flex;
    justify-content: flex-end;
}

.mindfull-source-component button {
    text-align: end;
    padding-right: 1.5rem;

    border: none;

    height: 60px;
    width: 70%;

    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;

    transition: padding-right 300ms ease-in-out, width 200ms ease-in-out;
}

.mindfull-source-component.selected button {
    padding-right: 5rem;

    width: 100%;
}
</style>
