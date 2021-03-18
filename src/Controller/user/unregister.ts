import Controller from '../../Types/Controller'
import Cache from '../../Adapter/Cache'

import { USER_SOCKET } from '../../Constants/CacheKeys'

export default class ControllerInstance implements Controller {
  execute (params: {socketId: string}) {
    const userIds = Cache.hfind(USER_SOCKET, params.socketId)
    userIds.forEach((userId) => {
      Cache.hdel(USER_SOCKET, userId, params.socketId)
    })
  }
}
