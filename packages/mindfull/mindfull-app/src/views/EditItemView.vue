<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { MindfullIdentifier } from 'mindfull-types'
import { colorTheme, MindfullItemEditingComponent } from 'mindfull-ui'

import BackButtonComponent from '@/components/BackButtonComponent.vue'

import mindfullStore from '@/store/mindfullStore'

const route = useRoute()

const sourceIndex = computed(() => {
    const source = route.params['source']

    return source !== '' ? Number(source) : 0
})

const entry = computed(() => {
    return mindfullStore.find(
        ({ source }) => source.sourceIndex === sourceIndex.value
    )
})

const router = useRouter()

const identifier = ref<MindfullIdentifier | null>()

onMounted(() => {
    identifier.value = { id: router.currentRoute.value.params['id'] as string }
})
</script>

<template>
    <main
        v-if="entry"
        :class="`wrapper-padding ${colorTheme(sourceIndex, 2).container}`"
    >
        <mindfull-item-editing-component
            v-if="identifier"
            :identifier="identifier"
            :store="entry.store"
            :source="entry.source"
        />

        <div class="back-button">
            <div>
                <back-button-component />
            </div>
        </div>
    </main>
</template>

<style scoped>
.back-button {
    margin-top: calc(50px + 1rem + 1rem);
}

.back-button > div {
    position: fixed;

    left: 1rem;
    bottom: 1rem;
}
</style>
