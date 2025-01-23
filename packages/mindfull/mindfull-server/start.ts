import { createFileStore } from './src/store/fileStore'
import server from '.'

server
    .createServer({
        // store: createFileStore('/home/user/specific/location/base')
    })
    .start()
