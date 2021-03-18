
import Controller from '../Types/Controller'
import UserRegister from '../Controller/user/register'
import UserUnregister from '../Controller/user/unregister'
import PriceUpdate from '../Controller/price/update'
import PricesRequest from '../Controller/price/request'

const routes = {
  '/user/register': new UserRegister(),
  '/user/unregister': new UserUnregister(),
  '/price/update': new PriceUpdate(),
  '/price/request': new PricesRequest()
} as {[key: string]: Controller}

export default function execute (path: string, params: unknown) {
  const controller = routes[path]
  if (!Object.prototype.hasOwnProperty.call(routes, path)) {
    console.error('Controller not found:', path)
    return
  }
  controller.execute(params)
}
