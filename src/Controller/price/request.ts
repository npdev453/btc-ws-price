import Controller from '../../Types/Controller'
import Cache from '../../Adapter/Cache'

import { BTC_PRICE, USER_SOCKET } from '../../Constants/CacheKeys'
import { sendWSMessage } from '../../Component/WSServer'

export default class ControllerInstance implements Controller {
  execute (param: {userId: string}) {
    const socketIds = Cache.hget(USER_SOCKET, param.userId) as string[]
    const btcPrice = Cache.get(BTC_PRICE)

    socketIds.forEach((socketId) => {
      sendWSMessage(socketId, { btcPrice })
    })
  }
}
