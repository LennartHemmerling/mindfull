<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { MindfullSourceComponent } from 'mindfull-ui'
import type { MindfullAppStoreEntry } from '@/store/mindfullStore'
import mindfullStore from '@/store/mindfullStore'

const props = defineProps<{ entry?: MindfullAppStoreEntry }>()

const sources = computed(() => {
    return mindfullStore.map(({ source }) => source)
})

const router = useRouter()

function clickSource(sourceIndex: number) {
    router.replace(`/${sourceIndex}`)
}
</script>

<template>
    <div class="sources">
        <template v-for="source in sources" :key="`source-${source}`">
            <mindfull-source-component
                :source="source"
                :selected="
                    props.entry?.source.sourceIndex === source.sourceIndex
                "
                :click-source="clickSource"
            />
        </template>
    </div>
</template>

<style scoped>
.sources {
    position: fixed;

    left: 0;

    width: 2.5rem;

    display: flex;
    flex-direction: column;

    gap: 20px;
}
</style>
