<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => router.replace('/1'))
</script>

<template></template>

<style scoped></style>
