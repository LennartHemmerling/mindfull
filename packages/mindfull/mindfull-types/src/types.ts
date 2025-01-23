export type MindfullIdentifier = {
    id: string
}

export type MindfullTag = MindfullIdentifier & {
    name: string
    description: string
    color: string
}

export type MindfullItem = MindfullIdentifier & {
    name: string
    description: string
    tags: MindfullIdentifier[]
    fragments: MindfullIdentifier[]
}

export type MindfullFragmentType = 'text' | 'todo' | 'date'

export type MindfullFragment = MindfullIdentifier & {
    name: string
    description: string
    type: MindfullFragmentType
    value: number
    date: number
}

export type MindfullStoreItemFilter = {}

export type MindfullStore = {
    getTags: () => Promise<MindfullIdentifier[]>
    getTag: (identifier: MindfullIdentifier) => Promise<MindfullTag>
    setTag: (tag: MindfullTag) => Promise<void>
    removeTag: (identifier: MindfullIdentifier) => Promise<void>

    getItems: (
        filter?: MindfullStoreItemFilter
    ) => Promise<MindfullIdentifier[]>
    getItem: (identifier: MindfullIdentifier) => Promise<MindfullItem>
    setItem: (item: MindfullItem) => Promise<void>
    removeItem: (identifier: MindfullIdentifier) => Promise<void>

    getFragments: () => Promise<MindfullIdentifier[]>
    getFragment: (identifier: MindfullIdentifier) => Promise<MindfullFragment>
    setFragment: (fragment: MindfullFragment) => Promise<void>
    removeFragment: (identifier: MindfullIdentifier) => Promise<void>
}
