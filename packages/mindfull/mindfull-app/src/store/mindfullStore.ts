import { Worker } from 'workers'
import {
    createMemoryStore,
    createServerConnectionStore,
    type MindfullIdentifier,
    type MindfullSource,
    type MindfullStore
} from 'mindfull-types'

export type MindfullAppStoreEntry = {
    source: MindfullSource
    store: MindfullStore
}

type MindfullAppStore = MindfullAppStoreEntry[]

const mindfullStore: MindfullAppStore = []

// Initialize store for given source
function hydrate(source: MindfullSource) {
    let store!: MindfullStore

    if (source.location === 'online') {
        if (!source.online) throw 'No valid online address'
        store = createServerConnectionStore(source?.online.address)
    } else {
        // TODO
        store = createMemoryStore()
    }

    mindfullStore.push({ source, store })
}

// INITIALIZE
JSON.parse(localStorage.getItem('MINDFULL_SOURCES') || '[]').forEach(hydrate)

hydrate({
    name: 'buttersmat',
    description: 'Unsere TODO-Listen.',
    sourceIndex: 0,
    location: 'online',
    online: {
        address: 'http://buttersmat.fritz.box:5000/'
    }
})

hydrate({
    name: 'fromScript@buttersmat',
    description: 'from script TODO-Listen.',
    sourceIndex: 1,
    location: 'online',
    online: {
        address: 'http://buttersmat.fritz.box:5001/'
    }
})

// Add new source
export function addSource(source: MindfullSource) {
    hydrate(source)

    // TODO save device specific
    localStorage.setItem(
        'MINDFULL_SOURCES',
        JSON.stringify(mindfullStore.map(({ source }) => source))
    )
}

// Watch for changes
export type UpdateWorkerData = {
    tags: MindfullIdentifier[]
    items: MindfullIdentifier[]
}

export function createUpdateWorker(
    store: MindfullStore,
    callback: (data: UpdateWorkerData) => void
): Worker {
    return new Worker(async () => {
        try {
            const [tags, items] = await Promise.all([
                store.getTags(),
                store.getItems()
            ])

            callback({ tags, items })
        } catch (e) {
            console.warn(e)
        }
    })
}

// Cache for new items
export async function createNewItemStore(identifier: MindfullIdentifier) {
    const store = createMemoryStore()

    await store.setItem({
        ...identifier,
        name: '',
        description: '',
        tags: [],
        fragments: []
    })

    return store
}

export default mindfullStore
