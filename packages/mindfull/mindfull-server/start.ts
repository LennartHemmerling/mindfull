import dotenv from 'dotenv'

import { createFileStore } from './src/store/fileStore'
import server from '.'

dotenv.config()

const configuration = {
    port: process.env.SERVER_PORT,
    store:
        process.env.SERVER_USE_STORE === 'file'
            ? createFileStore(process.env.SERVER_BASE_PATH)
            : undefined
}

server.createServer(configuration).start()
