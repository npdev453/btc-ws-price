
import WebSocket from 'ws'
import { v4 } from 'uuid'
import axios from 'axios'

import { describe, test, expect } from '@jest/globals'

const userId = v4()
const client = new WebSocket('ws://127.0.0.1:8080')

describe('Get BTC price', () => {
  test('Register', (done) => {
    client.on('connectFailed', (error) => {
      expect(error).toBe(undefined)
    })

    client.on('open', () => {
      client.send(JSON.stringify({ path: '/user/register', params: { userId: userId } }))
      done && done()
    })
  })

  test('Request price', (done) => {
    setTimeout(() => {
      axios.post('http://127.0.0.1:80/price/request', { userId })
      done && done()
    }, 300)
  })

  test('Recive BTC USD price', (done) => {
    client.on('message', (message: string) => {
      console.log('message', message)
      let data
      try {
        data = JSON.parse(message)
      } catch (error) {
        expect(error).toBe(undefined)
      }
      expect(Object.keys(data)).toContain('btcPrice')
      expect(typeof data.btcPrice).toBe('number')
      done && done()
      client.close()
    })
  })

  client.on('error', (error: unknown) => {
    expect(error).toBe(undefined)
  })
})
