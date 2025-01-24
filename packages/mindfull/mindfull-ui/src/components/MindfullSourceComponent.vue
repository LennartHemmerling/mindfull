<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    sourceIndex: number
    clickSource: () => void
}>()
</script>

<template>
    <div class="mindfull-source-component">
        <button @click="props.clickSource()"></button>
    </div>
</template>

<style scoped></style>
