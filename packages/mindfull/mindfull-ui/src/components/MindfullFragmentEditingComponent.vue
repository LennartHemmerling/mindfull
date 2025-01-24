<script setup lang="ts">
import { watch, onMounted, ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import type {
    MindfullIdentifier,
    MindfullStore,
    MindfullFragment
} from 'mindfull-types'

import InputLineComponent from './InputLineComponent.vue'
import InputAreaComponent from './InputAreaComponent.vue'

import chooseDefaultColor from '../assets/chooseDefaultColor'

const props = defineProps<{
    sourceIndex: number
    identifier: MindfullIdentifier
    store: MindfullStore
}>()

const fragment = ref<MindfullFragment | null>(null)

onMounted(async () => {
    fragment.value = await props.store.getFragment(props.identifier)

    watch(
        fragment,
        async (fragment) => {
            if (fragment) await props.store.setFragment(fragment)
        },
        {
            deep: true
        }
    )
})

function toggleCheckbox() {
    if (fragment.value) fragment.value.value = fragment.value.value <= 0 ? 1 : 0
}
</script>

<template>
    <div
        v-if="fragment"
        :class="`mindfull-fragment-editing-component ${
            chooseDefaultColor(props.sourceIndex, 0).container
        }`"
    >
        <div class="mindfull-fragment-editing-component_action">
            <button v-if="fragment.type === 'todo'" @click="toggleCheckbox()">
                <font-awesome-icon
                    v-if="fragment.value <= 0"
                    :class="chooseDefaultColor(props.sourceIndex, 0).text"
                    icon="fa-solid fa-square"
                />

                <font-awesome-icon
                    v-else
                    :class="chooseDefaultColor(props.sourceIndex, 0).text"
                    icon="fa-solid fa-square-check"
                />
            </button>
        </div>

        <div class="mindfull-fragment-editing-component_type">
            <button
                :class="fragment.type === 'text' ? 'selected' : ''"
                @click="fragment.type = 'text'"
            >
                <font-awesome-icon icon="fa-solid fa-font" />
            </button>

            <button
                :class="fragment.type === 'todo' ? 'selected' : ''"
                @click="fragment.type = 'todo'"
            >
                <font-awesome-icon icon="fa-solid fa-circle-check" />
            </button>

            <button
                :class="fragment.type === 'date' ? 'selected' : ''"
                @click="fragment.type = 'date'"
            >
                <font-awesome-icon icon="fa-solid fa-calendar" />
            </button>
        </div>

        <div class="mindfull-fragment-editing-component_title">
            <input-line-component
                :class="chooseDefaultColor(props.sourceIndex, 1).container"
                v-model="fragment.name"
                debounce="500"
            />
        </div>

        <div class="mindfull-fragment-editing-component_content">
            <input-area-component
                :class="chooseDefaultColor(props.sourceIndex, 1).container"
                v-model="fragment.description"
                debounce="500"
            />
        </div>
    </div>
</template>

<style scoped>
.mindfull-fragment-editing-component {
    border-radius: 10px;

    padding: 10px;

    margin-left: 10px;

    display: grid;
    grid-template-areas: 'type type' 'action title' 'action content';
    grid-template-columns: auto 1fr;

    gap: 10px;
}

.mindfull-fragment-editing-component_action {
    grid-area: action;

    padding-top: 5px;
    padding-right: 5px;
}

.mindfull-fragment-editing-component_action button {
    border: none;
    background-color: transparent;
}

.mindfull-fragment-editing-component_action button svg {
    font-size: 1.2rem;
}

.mindfull-fragment-editing-component_type {
    grid-area: type;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
}

.mindfull-fragment-editing-component_type button {
    border: solid 2px var(--mustard);
    border-radius: 5px;

    padding: 5px;

    background-color: var(--jasmine);

    transition: border-color 200ms ease-in-out,
        background-color 200ms ease-in-out;
}

.mindfull-fragment-editing-component_type button svg {
    color: var(--jet);

    transition: color 200ms ease-in-out;
}

.mindfull-fragment-editing-component_type button.selected {
    border-color: var(--jasmine);
    background-color: var(--jet);
}

.mindfull-fragment-editing-component_type button.selected svg {
    color: var(--jasmine);
}

.mindfull-fragment-editing-component_title {
    grid-area: title;
}

.mindfull-fragment-editing-component_content {
    grid-area: content;
}

.mindfull-fragment-editing-component_title input,
.mindfull-fragment-editing-component_content textarea {
    width: 100%;

    outline: none;
    border: none;
    border-radius: 15px;

    padding: 10px;
}

.mindfull-fragment-editing-component_content textarea {
    resize: none;
}
</style>
