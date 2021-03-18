import Router from './Router'

// Temporarly cron implementation :)

interface ScheduleBase {
    controllerPath: string,
    controllerParams?: unknown,
    timeoutMs: number,
}

interface ScheduleInterval extends ScheduleBase {
  isInterval: boolean,
  runImmediately: boolean,
}

export default function addToShedule (params: ScheduleBase | ScheduleInterval) {
  const {
    controllerPath,
    controllerParams,
    timeoutMs
  } = params

  if ((params as ScheduleInterval).runImmediately) {
    Router(controllerPath, controllerParams)
  }

  ((params as ScheduleInterval).isInterval ? setInterval : setTimeout)(() => {
    Router(controllerPath, controllerParams)
  }, timeoutMs)
}
