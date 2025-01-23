<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Worker } from 'workers'

import type {
    MindfullIdentifier,
    MindfullStore,
    MindfullItem
} from 'mindfull-types'

import MindfullFragmentComponent from './MindfullFragmentComponent.vue'

const props = defineProps<{
    identifier: MindfullIdentifier
    store: MindfullStore
    clickEdit: () => void
}>()

const item = ref<MindfullItem | null>(null)

let worker: Worker | null = null

onMounted(
    () =>
        (worker = new Worker(async () => {
            item.value = await props.store.getItem(props.identifier)
        }).start(2000, true, true))
)

onBeforeUnmount(() => worker?.stop())
</script>

<template>
    <div v-if="item" class="mindfull-item-component">
        <div class="mindfull-item-component_title">
            <h2>{{ item.name }}</h2>
        </div>

        <div class="mindfull-item-component_content">
            <template
                v-for="(line, i) in item.description.split('\n')"
                :key="`item-description-${line}-${i}`"
            >
                <p>{{ line }}</p>
            </template>
        </div>

        <div class="mindfull-item-component_edit">
            <button @click="props.clickEdit()">
                <font-awesome-icon icon="fa-solid fa-pen-to-square" />
            </button>
        </div>

        <div class="mindfull-item-component_fragments">
            <template v-for="(identifier, i) in item.fragments">
                <transition
                    name="mindfull-item-component_fragments-transition"
                    :style="`transition-duration: ${i * 100 + 400}ms;`"
                >
                    <mindfull-fragment-component
                        :identifier="identifier"
                        :store="props.store"
                    />
                </transition>
            </template>
        </div>
    </div>
</template>

<style scoped>
.mindfull-item-component {
    border-radius: 10px;

    padding: 10px;

    margin-top: 1rem;

    background-color: var(--mustard);

    display: grid;
    grid-template-areas: 'title edit' 'content content' 'fragments fragments';
    grid-template-columns: 1fr auto;

    gap: 10px;
}

.mindfull-item-component_title {
    grid-area: title;

    color: var(--jet);
}

.mindfull-item-component_content {
    grid-area: content;

    color: var(--jet);
}

.mindfull-item-component_edit {
    grid-area: edit;
}

.mindfull-item-component_edit button {
    border: none;
    background-color: transparent;
}

.mindfull-item-component_edit button svg {
    font-size: 1rem;
    color: var(--jet);
}

.mindfull-item-component_fragments {
    grid-area: fragments;

    display: flex;
    flex-direction: column;

    gap: 10px;
}

.mindfull-item-component_fragments-transition-enter-active,
.mindfull-item-component_fragments-transition-leave-active {
    transition: translate 200ms ease-out;
}

.mindfull-item-component_fragments-transition-enter-from,
.mindfull-item-component_fragments-transition-leave-to {
    translate: -100vw 0;
}
</style>
