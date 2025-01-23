import type {
    MindfullFragment,
    MindfullItem,
    MindfullStore,
    MindfullTag
} from '../types'

type MindfullMemoryStore = MindfullStore

export function createMemoryStore(): MindfullMemoryStore {
    const tags: MindfullTag[] = []

    const items: MindfullItem[] = []

    const fragments: MindfullFragment[] = []

    return {
        async getTags() {
            return tags.map(({ id }) => ({ id }))
        },
        async getTag(identifier) {
            const storedTag = tags.find(({ id }) => identifier.id === id)

            if (!storedTag) throw 'Tag does not exist on memory store.'
            return storedTag
        },
        async setTag(tag) {
            const storedTag = tags.find(({ id }) => tag.id === id)

            if (storedTag) tags.splice(tags.indexOf(storedTag), 1, tag)
            else tags.push(tag)
        },
        async removeTag(identifier) {
            const storedTag = tags.find(({ id }) => identifier.id === id)

            if (storedTag) tags.splice(tags.indexOf(storedTag), 1)
            else throw 'Tag does not exist on memory store.'
        },

        async getItems() {
            return items.map(({ id }) => ({ id }))
        },
        async getItem(identifier) {
            const storedItem = items.find(({ id }) => identifier.id === id)

            if (!storedItem) throw 'Item does not exist on memory store.'
            return storedItem
        },
        async setItem(item) {
            const storedItem = items.find(({ id }) => item.id === id)

            if (storedItem) items.splice(items.indexOf(storedItem), 1, item)
            else items.push(item)
        },
        async removeItem(identifier) {
            const storedItem = items.find(({ id }) => identifier.id === id)

            if (storedItem) items.splice(items.indexOf(storedItem), 1)
            else throw 'Item does not exist on memory store.'
        },

        async getFragments() {
            return fragments.map(({ id }) => ({ id }))
        },
        async getFragment(identifier) {
            const storedFragment = fragments.find(
                ({ id }) => identifier.id === id
            )

            if (!storedFragment)
                throw 'Fragment does not exist on memory store.'
            return storedFragment
        },
        async setFragment(fragment) {
            const storedFragment = fragments.find(
                ({ id }) => fragment.id === id
            )

            if (storedFragment)
                fragments.splice(fragments.indexOf(storedFragment), 1, fragment)
            else fragments.push(fragment)
        },
        async removeFragment(identifier) {
            const storedFragment = fragments.find(
                ({ id }) => identifier.id === id
            )

            if (storedFragment)
                fragments.splice(fragments.indexOf(storedFragment), 1)
            else throw 'Fragment does not exist on memory store.'
        }
    }
}
