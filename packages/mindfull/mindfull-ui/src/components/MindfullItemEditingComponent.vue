<script setup lang="ts">
import { watch, onMounted, ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import type {
    MindfullIdentifier,
    MindfullStore,
    MindfullItem
} from 'mindfull-types'

import InputLineComponent from './InputLineComponent.vue'
import InputAreaComponent from './InputAreaComponent.vue'

import MindfullFragmentEditingComponent from './MindfullFragmentEditingComponent.vue'

const props = defineProps<{
    identifier: MindfullIdentifier
    store: MindfullStore
}>()

const item = ref<MindfullItem | null>(null)

onMounted(async () => {
    item.value = await props.store.getItem(props.identifier)

    watch(
        item,
        async (item) => {
            if (item) await props.store.setItem(item)
        },
        {
            deep: true
        }
    )
})

async function addFragment() {
    if (!item.value) return

    const identifier = {
        id: `${new Date().getTime()}`
    }

    await props.store.setFragment({
        ...identifier,
        name: '',
        description: '',
        type: 'text',
        value: 0,
        date: 0
    })

    item.value.fragments.push(identifier)
}
</script>

<template>
    <div v-if="item">
        <div class="mindfull-item-editing-component">
            <div class="mindfull-item-editing-component_title">
                <input-line-component v-model="item.name" debounce="500" />
            </div>

            <div class="mindfull-item-editing-component_content">
                <input-area-component
                    v-model="item.description"
                    debounce="500"
                />
            </div>
        </div>

        <div class="mindfull-item-editing-component_fragments">
            <template v-for="(identifier, i) in item.fragments">
                <transition
                    name="mindfull-item-editing-component_fragments-transition"
                    :style="`transition-duration: ${i * 100 + 400}ms;`"
                >
                    <mindfull-fragment-editing-component
                        :identifier="identifier"
                        :store="props.store"
                    />
                </transition>
            </template>

            <button
                class="mindfull-item-editing-component_fragments-add-button"
                @click="addFragment()"
            >
                <font-awesome-icon icon="fa-solid fa-plus" />
            </button>
        </div>
    </div>
</template>

<style scoped>
.mindfull-item-editing-component {
    border-radius: 10px;

    padding: 10px;

    margin-top: 1rem;

    background-color: var(--mustard);

    display: grid;
    grid-template-areas: 'title' 'content';
    grid-template-columns: 1fr;

    gap: 10px;
}

.mindfull-item-editing-component_title {
    grid-area: title;

    color: var(--jet);
}

.mindfull-item-editing-component_content {
    grid-area: content;

    color: var(--jet);
}

.mindfull-item-editing-component_title input,
.mindfull-item-editing-component_content textarea {
    width: 100%;

    outline: none;
    border: none;
    border-radius: 15px;

    padding: 10px;

    background-color: var(--jasmine);
}

.mindfull-item-editing-component_title input {
    font-size: large;
}

.mindfull-item-editing-component_content textarea {
    resize: none;
}

.mindfull-item-editing-component_fragments {
    display: flex;
    flex-direction: column;

    margin-top: 10px;
    gap: 10px;
}

.mindfull-item-editing-component_fragments-transition-enter-active,
.mindfull-item-editing-component_fragments-transition-leave-active {
    transition: translate 200ms ease-out;
}

.mindfull-item-editing-component_fragments-transition-enter-from,
.mindfull-item-editing-component_fragments-transition-leave-to {
    translate: -100vw 0;
}

.mindfull-item-editing-component_fragments-add-button {
    border: none;
    border-radius: 5px;

    padding: 5px;

    background-color: var(--seasalt);
}

.mindfull-item-editing-component_fragments-add-button svg {
    color: var(--jet);
}
</style>
