
import WebSocket, { Server as WebSockerServer } from 'ws'
import { v4 } from 'uuid'

import Router from '../Module/Router'
import Config from '../config'

const WSServer = new WebSockerServer({ port: Config.wssPort })

const clients = {} as {[key: string]: WebSocket}

WSServer.on('connection', (ws) => {
  const socketId = v4()
  clients[socketId] = ws

  ws.on('message', (message) => {
    let body
    try {
      body = JSON.parse(message.toString())
    } catch (e) {
      return
    }
    if (body && body.path) {
      body.params.socketId = socketId
      Router(body.path, body.params)
    }
  })

  ws.on('close', () => {
    Router('/user/unregister', { socketId })
    delete clients[socketId]
  })
})

export function sendWSMessage (socketId: string, data: unknown) {
  clients[socketId]?.send(JSON.stringify(data))
}

export default WSServer
