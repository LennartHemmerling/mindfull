# mindfull - monorepo

## Development

1. Install dependencies: `bun i`
2. Run app in browser `bun run start:app`
3. Run server on local network `bun run start:server`

## Configuration

### Server

The mindfull server application is located at `/packages/mindfull/mindfull-server`

#### .env configuration `/packages/mindfull/mindfull-server/.env`

```
SERVER_PORT = 5000
SERVER_USE_STORE = file //memory
SERVER_BASE_PATH = /home/<user>/mindfull-server
```
