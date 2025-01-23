import type { MindfullStore } from '../types'

type MindfullServerConnectionStore = MindfullStore

export function createServerConnectionStore(
    address: string
): MindfullServerConnectionStore {
    if (address.slice(-1) === '/') address = address.slice(0, -1)

    return {
        async getTags() {
            return await fetch(`${address}/tags`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then(({ status, value }) => {
                    if (status !== 200)
                        throw `Error in response: status ${status}.`

                    return value.tags
                })
        },
        async getTag(identifier) {
            return await fetch(`${address}/tag?identifier=${identifier.id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then(({ status, value }) => {
                    if (status !== 200)
                        throw `Error in response: status ${status}.`

                    return value.tag
                })
        },
        async setTag(tag) {
            await fetch(`${address}/tag`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tag })
            })
                .then((res) => res.json())
                .then(({ status }) => {
                    if (status !== 200)
                        throw `Error in response: status ${status}.`
                })
        },
        async removeTag(identifier) {
            await fetch(`${address}/tag`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ identifier })
            })
                .then((res) => res.json())
                .then(({ status }) => {
                    if (status !== 200)
                        throw `Error in response: status ${status}.`
                })
        },

        async getItems(filter) {
            return await fetch(`${address}/items`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then(({ status, value }) => {
                    if (status !== 200)
                        throw `Error in response: status ${status}.`

                    return value.items
                })
        },
        async getItem(identifier) {
            return await fetch(`${address}/item?identifier=${identifier.id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then(({ status, value }) => {
                    if (status !== 200)
                        throw `Error in response: status ${status}.`

                    return value.item
                })
        },
        async setItem(item) {
            await fetch(`${address}/item`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ item })
            })
                .then((res) => res.json())
                .then(({ status }) => {
                    if (status !== 200)
                        throw `Error in response: status ${status}.`
                })
        },
        async removeItem(identifier) {
            await fetch(`${address}/item`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ identifier })
            })
                .then((res) => res.json())
                .then(({ status }) => {
                    if (status !== 200)
                        throw `Error in response: status ${status}.`
                })
        },

        async getFragments() {
            return await fetch(`${address}/fragments`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then(({ status, value }) => {
                    if (status !== 200)
                        throw `Error in response: status ${status}.`

                    return value.fragments
                })
        },
        async getFragment(identifier) {
            return await fetch(
                `${address}/fragment?identifier=${identifier.id}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then((res) => res.json())
                .then(({ status, value }) => {
                    if (status !== 200)
                        throw `Error in response: status ${status}.`

                    return value.fragment
                })
        },
        async setFragment(fragment) {
            await fetch(`${address}/fragment`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fragment })
            })
                .then((res) => res.json())
                .then(({ status }) => {
                    if (status !== 200)
                        throw `Error in response: status ${status}.`
                })
        },
        async removeFragment(identifier) {
            await fetch(`${address}/fragment`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ identifier })
            })
                .then((res) => res.json())
                .then(({ status }) => {
                    if (status !== 200)
                        throw `Error in response: status ${status}.`
                })
        }
    }
}
