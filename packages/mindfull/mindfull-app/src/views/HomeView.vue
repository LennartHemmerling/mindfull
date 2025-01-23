<script setup lang="ts">
import { reactive, onBeforeUnmount, onMounted } from 'vue'
import type { Worker } from 'workers'
import { MindfullItemComponent } from 'mindfull-ui'

import ToolbarComponent from '@/components/ToolbarComponent.vue'
import mindfullStore, {
    createUpdateWorker,
    type UpdateWorkerData
} from '@/store/mindfullStore'

const data = reactive<UpdateWorkerData>({
    tags: [],
    items: []
})

let worker: Worker | null = null

onMounted(
    () =>
        (worker = createUpdateWorker(({ tags, items }) => {
            data.tags = tags
            data.items = items
        }).start(5000, true, true))
)

onBeforeUnmount(() => worker?.stop())
</script>

<template>
    <main>
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
                    :store="mindfullStore"
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
    </main>
</template>

<style scoped>
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
