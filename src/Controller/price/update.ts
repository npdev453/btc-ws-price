import axios from 'axios'

import Controller from '../../Types/Controller'
import Cache from '../../Adapter/Cache'

import { BTC_PRICE } from '../../Constants/CacheKeys'

export default class ControllerInstance implements Controller {
  async execute () {
    try {
      const response = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD', {
        headers: {
          authorization: 'apikey bab3b75fec6bb87fb24d2a83a997f1471e8a65c0e4ce6c3c36efa93bc0bf0547'
        }
      })
      Cache.set(BTC_PRICE, response.data.USD)
    } catch (e) {
      console.error('Failed to update BTC_USD price:', e)
    }
  }
}
