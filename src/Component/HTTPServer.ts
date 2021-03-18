
import http from 'http'
import Router from '../Module/Router'
import Config from '../config'

export default http.createServer(function (request, response) {
  let data = ''
  request.on('data', chunk => {
    data += chunk
  })
  request.on('end', () => {
    try {
      data = JSON.parse(data)
    } catch (e) {
      response.end()
      return
    }
    if (request.url) {
      Router(request.url, data)
    }
    response.end()
  })
}).listen(Config.httpPort)
