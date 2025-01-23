import fs from 'fs'
import path from 'path'

import type {
    MindfullFragment,
    MindfullItem,
    MindfullStore,
    MindfullTag
} from '../types'

type MindfullFileStore = MindfullStore

export function createFileStore(basePath: string): MindfullFileStore {
    const tags: MindfullTag[] = []

    const items: MindfullItem[] = []

    const fragments: MindfullFragment[] = []

    if (!fs.existsSync(basePath)) throw 'Base path does not exist.'
    if (!fs.statSync(basePath).isDirectory())
        throw 'Base path is not a directory.'

    const TAGS_PATH = path.join(basePath, 'tags')
    const ITEMS_PATH = path.join(basePath, 'items')
    const FRAGMENTS_PATH = path.join(basePath, 'fragments')

    const _allPaths = [TAGS_PATH, ITEMS_PATH, FRAGMENTS_PATH]
    _allPaths.forEach((path) => {
        if (!fs.existsSync(path)) fs.mkdirSync(path)
    })

    fs.readdirSync(TAGS_PATH, { withFileTypes: true }).forEach((file) => {
        if (!file.isFile()) return

        tags.push(
            JSON.parse(
                fs.readFileSync(path.join(TAGS_PATH, file.name)).toString()
            )
        )
    })

    fs.readdirSync(ITEMS_PATH, { withFileTypes: true }).forEach((file) => {
        if (!file.isFile()) return

        items.push(
            JSON.parse(
                fs.readFileSync(path.join(ITEMS_PATH, file.name)).toString()
            )
        )
    })

    fs.readdirSync(FRAGMENTS_PATH, { withFileTypes: true }).forEach((file) => {
        if (!file.isFile()) return

        fragments.push(
            JSON.parse(
                fs.readFileSync(path.join(FRAGMENTS_PATH, file.name)).toString()
            )
        )
    })

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

            fs.writeFileSync(path.join(TAGS_PATH, tag.id), JSON.stringify(tag))
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

            fs.writeFileSync(
                path.join(ITEMS_PATH, item.id),
                JSON.stringify(item)
            )
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

            fs.writeFileSync(
                path.join(FRAGMENTS_PATH, fragment.id),
                JSON.stringify(fragment)
            )
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
