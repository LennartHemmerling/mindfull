<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { MindfullIdentifier } from 'mindfull-types'
import { MindfullItemEditingComponent } from 'mindfull-ui'

import BackButtonComponent from '@/components/BackButtonComponent.vue'

import router from '@/router'

import mindfullStore from '@/store/mindfullStore'

const identifier = ref<MindfullIdentifier | null>()

onMounted(() => {
    identifier.value = { id: router.currentRoute.value.params['id'] as string }
})
</script>

<template>
    <main>
        <mindfull-item-editing-component
            v-if="identifier"
            :identifier="identifier"
            :store="mindfullStore"
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
