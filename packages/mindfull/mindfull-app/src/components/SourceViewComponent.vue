<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { MindfullSourceComponent } from 'mindfull-ui'
import type { MindfullAppStoreEntry } from '@/store/mindfullStore'
import mindfullStore from '@/store/mindfullStore'

const props = defineProps<{ entry?: MindfullAppStoreEntry }>()

const sources = computed(() => {
    return mindfullStore
        .map(({ source }) => source)
        .sort((source) => (props.entry?.source === source ? -1 : 0))
})

const router = useRouter()

function clickSource(sourceIndex: number) {
    router.replace(`/${sourceIndex}`)
}
</script>

<template>
    <div class="sources">
        <transition-group tag="div" class="sources-wrapper" name="sources">
            <template
                v-for="source in sources"
                :key="`source-${source.sourceIndex}`"
            >
                <mindfull-source-component
                    :source="source"
                    :selected="
                        props.entry?.source.sourceIndex === source.sourceIndex
                    "
                    :click-source="clickSource"
                />
            </template>
        </transition-group>
    </div>
</template>

<style scoped>
.sources {
    pointer-events: none;

    position: fixed;

    left: 0;
}

.sources-wrapper {
    position: relative;

    display: flex;
    flex-direction: column;

    gap: 20px;
}

.sources-move {
    transition: transform 0.5s ease-in-out;
}
</style>
