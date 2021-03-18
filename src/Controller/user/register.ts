import Controller from '../../Types/Controller'
import Cache from '../../Adapter/Cache'

import { USER_SOCKET } from '../../Constants/CacheKeys'

export default class ControllerInstance implements Controller {
  execute (params: {userId: string, socketId: string}) {
    Cache.hset(USER_SOCKET, params.userId, params.socketId)
  }
}
