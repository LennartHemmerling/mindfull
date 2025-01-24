<script setup lang="ts">
import { reactive, onBeforeUnmount, onMounted, watch, computed } from 'vue'
import type { Worker } from 'workers'
import { MindfullItemComponent, colorTheme } from 'mindfull-ui'

import ToolbarComponent from '@/components/ToolbarComponent.vue'
import {
    createUpdateWorker,
    type MindfullAppStoreEntry,
    type UpdateWorkerData
} from '@/store/mindfullStore'

const props = defineProps<{ entry: MindfullAppStoreEntry }>()

const data = reactive<UpdateWorkerData>({
    tags: [],
    items: []
})

const updateWorker = computed<Worker>((old) => {
    old?.stop()

    return createUpdateWorker(props.entry.store, ({ tags, items }) => {
        data.tags = tags
        data.items = items
    })
})

watch(updateWorker, (updateWorker) => updateWorker.start(5000, true, true), {
    immediate: true
})

onBeforeUnmount(() => updateWorker.value.stop())
</script>

<template>
    <div
        :class="`wrapper-padding ${
            colorTheme(props.entry.source.sourceIndex, 2).container
        }`"
    >
        <template
            v-for="(identifier, i) in data.items"
            :key="`tag-${identifier.id}`"
        >
            <transition
                name="item-transition"
                :style="`transition-delay: ${i * 100}ms;`"
            >
                <mindfull-item-component
                    :identifier="identifier"
                    :source="props.entry.source"
                    :store="props.entry.store"
                    :click-edit="
                        () =>
                            $router.push({
                                name: 'edit-item',
                                params: { ...identifier }
                            })
                    "
                />
            </transition>
        </template>

        <div class="toolbar">
            <div>
                <toolbar-component />
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper-padding {
    min-height: 100vh;
}

.item-transition-enter-active,
.item-transition-leave-active {
    transition: translate 300ms ease-in-out, opacity 200ms ease-in-out;
}

.item-transition-enter-from,
.item-transition-leave-to {
    translate: -100vw 0;
    opacity: 0;
}

.toolbar {
    margin-top: calc(50px + 1rem + 1rem);
}

.toolbar > div {
    position: fixed;

    bottom: 1rem;
    right: 1rem;
}
</style>
