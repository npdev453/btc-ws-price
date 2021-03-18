import Shedule from './Module/Shedule'

import('./Component/WSServer').then(() => {
  console.log('[WSServer] started')
})

import('./Component/HTTPServer').then(() => {
  console.log('[HTTPServer] started')
})

Shedule({
  controllerPath: '/price/update',
  timeoutMs: 60 * 1000,
  runImmediately: true,
  isInterval: true
})
