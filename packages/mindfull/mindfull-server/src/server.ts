import express, { type Response } from 'express'
import cors from 'cors'

import {
    createMemoryStore,
    type MindfullFragment,
    type MindfullIdentifier,
    type MindfullItem,
    type MindfullStore,
    type MindfullTag
} from 'mindfull-types'

export type ServerConfiguration = {
    port?: string
    store?: MindfullStore
}

function withStatus(res: Response) {
    return function (status: 200 | 404, value?: unknown) {
        if (value)
            return res.status(status).json({
                status,
                value
            })
        else return res.status(status).json({ status })
    }
}

export function createServer(serverConfiguration?: ServerConfiguration) {
    const port = serverConfiguration?.port || '5000'
    const store = serverConfiguration?.store || createMemoryStore()

    return {
        async start(): Promise<void> {
            const app = express()

            app.use(cors({ origin: '*' }))
            app.use(express.json())

            app.get('/tags', async (_, res) => {
                const tags = await store.getTags()

                withStatus(res)(200, { tags })
            })

            app.get('/tag', async (req, res) => {
                try {
                    const id = req.query.identifier as string

                    const tag = await store.getTag({ id })

                    withStatus(res)(200, { tag })
                } catch (e) {
                    withStatus(res)(404)
                }
            })

            app.post('/tag', async (req, res) => {
                const tag = req.body.tag as MindfullTag

                await store.setTag(tag)

                withStatus(res)(200)
            })

            app.delete('/tag', async (req, res) => {
                try {
                    const identifier = req.body.identifier as MindfullIdentifier

                    await store.removeTag(identifier)

                    withStatus(res)(200)
                } catch (e) {
                    withStatus(res)(404)
                }
            })

            app.get('/items', async (_, res) => {
                const items = await store.getItems()

                withStatus(res)(200, { items })
            })

            app.get('/item', async (req, res) => {
                try {
                    const id = req.query.identifier as string

                    const item = await store.getItem({ id })

                    withStatus(res)(200, { item })
                } catch (e) {
                    withStatus(res)(404)
                }
            })

            app.post('/item', async (req, res) => {
                const item = req.body.item as MindfullItem

                await store.setItem(item)

                withStatus(res)(200)
            })

            app.delete('/item', async (req, res) => {
                try {
                    const identifier = req.body.identifier as MindfullIdentifier

                    await store.removeItem(identifier)

                    withStatus(res)(200)
                } catch (e) {
                    withStatus(res)(404)
                }
            })

            app.get('/fragments', async (_, res) => {
                const fragments = await store.getFragments()

                withStatus(res)(200, { fragments })
            })

            app.get('/fragment', async (req, res) => {
                try {
                    const id = req.query.identifier as string

                    const fragment = await store.getFragment({ id })

                    withStatus(res)(200, { fragment })
                } catch (e) {
                    withStatus(res)(404)
                }
            })

            app.post('/fragment', async (req, res) => {
                const fragment = req.body.fragment as MindfullFragment

                await store.setFragment(fragment)

                withStatus(res)(200)
            })

            app.delete('/fragment', async (req, res) => {
                try {
                    const identifier = req.body.identifier as MindfullIdentifier

                    await store.removeFragment(identifier)

                    withStatus(res)(200)
                } catch (e) {
                    withStatus(res)(404)
                }
            })

            app.listen(port, () => {
                console.log(`Mindfull server listening on port ${port}`)
            })
        }
    }
}
