<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { type MindfullIdentifier, type MindfullStore } from 'mindfull-types'
import { MindfullItemEditingComponent } from 'mindfull-ui'

import BackButtonComponent from '@/components/BackButtonComponent.vue'

import mindfullStore, { createNewItemStore } from '@/store/mindfullStore'

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

const newItemId: MindfullIdentifier = { id: 'new' }
const newItemStore = ref<MindfullStore | null>(null)
onMounted(
    async () => (newItemStore.value = await createNewItemStore(newItemId))
)

async function saveNewItem() {
    if (!newItemStore.value) return

    const item = await newItemStore.value.getItem(newItemId)
    item.id = `${new Date().getTime()}`

    await Promise.all(
        item.fragments.map(async (identifier) => {
            if (!newItemStore.value) return

            const fragment = await newItemStore.value.getFragment(identifier)
            await entry.value?.store.setFragment(fragment)
        })
    )

    await entry.value?.store.setItem(item)

    router.back()
}
</script>

<template>
    <main v-if="entry" class="wrapper-padding">
        <mindfull-item-editing-component
            v-if="newItemStore"
            :identifier="newItemId"
            :store="newItemStore"
            :source="entry.source"
        />

        <div class="back-button">
            <div>
                <back-button-component />
            </div>

            <div>
                <button @click="saveNewItem()">
                    <font-awesome-icon icon="fa-solid fa-check" />
                </button>
            </div>
        </div>
    </main>
</template>

<style scoped>
.back-button {
    margin-top: calc(50px + 1rem + 1rem);
}

.back-button > div:first-child {
    position: fixed;

    left: 1rem;
    bottom: 1rem;
}

.back-button > div:last-child {
    position: fixed;

    right: 1rem;
    bottom: 1rem;
}

.back-button > div:last-child button {
    border-radius: 50%;
    width: 50px;
    height: 50px;

    border: none;

    background-color: var(--seasalt);

    transition: scale 200ms ease-in-out;

    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.back-button > div:last-child button:active {
    scale: 0.9;
}

.back-button > div:last-child button svg {
    font-size: 20px;

    color: var(--jet);
}
</style>
