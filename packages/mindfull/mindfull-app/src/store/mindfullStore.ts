import { Worker } from 'workers'
import {
    createMemoryStore,
    createServerConnectionStore,
    type MindfullIdentifier
} from 'mindfull-types'

const store = createServerConnectionStore('http://192.168.178.22:5000/')

export type UpdateWorkerData = {
    tags: MindfullIdentifier[]
    items: MindfullIdentifier[]
}

export function createUpdateWorker(
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

export default store
