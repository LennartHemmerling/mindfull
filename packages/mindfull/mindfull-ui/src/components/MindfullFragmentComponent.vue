<script setup lang="ts">
import { watch, onMounted, ref, onBeforeUnmount, reactive } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Worker } from 'workers'

import type {
    MindfullIdentifier,
    MindfullStore,
    MindfullFragment
} from 'mindfull-types'

import chooseDefaultColor from '../assets/chooseDefaultColor'

const props = defineProps<{
    sourceIndex: number
    identifier: MindfullIdentifier
    store: MindfullStore
}>()

const fragment = ref<MindfullFragment | null>(null)

const workers = reactive<{ [key: string]: Worker | null }>({
    updateWorker: null
})

onMounted(() => {
    workers.updateWorker = new Worker(async () => {
        fragment.value = await props.store.getFragment(props.identifier)
    }).start(2000, true, true)

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

onBeforeUnmount(() => workers.updateWorker?.stop())

function toggleCheckbox() {
    if (fragment.value) fragment.value.value = fragment.value.value <= 0 ? 1 : 0
}
</script>

<template>
    <div
        v-if="fragment"
        :class="`mindfull-fragment-component ${
            chooseDefaultColor(props.sourceIndex, 1).container
        }`"
    >
        <div class="mindfull-fragment-component_action">
            <button v-if="fragment.type === 'todo'" @click="toggleCheckbox()">
                <font-awesome-icon
                    v-if="fragment.value <= 0"
                    :class="chooseDefaultColor(props.sourceIndex, 1).text"
                    icon="fa-solid fa-square"
                />

                <font-awesome-icon
                    v-else
                    :class="chooseDefaultColor(props.sourceIndex, 1).text"
                    icon="fa-solid fa-square-check"
                />
            </button>
        </div>

        <div
            :class="`mindfull-fragment-component_title ${
                chooseDefaultColor(props.sourceIndex, 1).text
            }`"
        >
            <h3>{{ fragment.name }}</h3>
        </div>

        <div
            v-if="fragment.description.trim() !== ''"
            :class="`mindfull-fragment-component_content ${
                chooseDefaultColor(props.sourceIndex, 1).text
            }`"
        >
            <template
                v-for="(line, i) in fragment.description.split('\n')"
                :key="`fragment-description-${line}-${i}`"
            >
                <p>{{ line }}</p>
            </template>
        </div>
    </div>
</template>

<style scoped>
.mindfull-fragment-component {
    border-radius: 10px;

    padding: 10px;

    display: grid;
    grid-template-areas: 'action title' 'action content';
    grid-template-columns: auto 1fr;
}

.mindfull-fragment-component_action {
    grid-area: action;

    padding-top: 5px;
    padding-right: 5px;
}

.mindfull-fragment-component_action button {
    border: none;
    background-color: transparent;
}

.mindfull-fragment-component_action button svg {
    font-size: 1.2rem;
}

.mindfull-fragment-component_title {
    grid-area: title;
}

.mindfull-fragment-component_content {
    grid-area: content;
}
</style>
