// Cacher mockup

const localCache = {} as {[key: string]: unknown}
const deepLocalCache = {} as {[key: string]: {[key: string]: unknown[]}}

class Cache {
  set (key: string, value: unknown) {
    localCache[key] = value
  }

  get (key: string) {
    return localCache[key]
  }

  hset (key: string, subKey: string, value:unknown) {
    if (!localCache[key]) {
      deepLocalCache[key] = { [subKey]: [value] }
    } else {
      deepLocalCache[key][subKey].push(value)
    }
  }

  hget (key: string, subKey: string) {
    return deepLocalCache[key]?.[subKey] || []
  }

  hdel (key: string, subKey: string, value:unknown) {
    if (deepLocalCache[key][subKey]) {
      deepLocalCache[key][subKey] = deepLocalCache[key][subKey].filter(e => e !== value)
      if (!deepLocalCache[key][subKey].length) {
        delete deepLocalCache[key][subKey]
      }
    }
  }

  hfind (key: string, value: string): string[] {
    const result = [] as string[]
    if (!deepLocalCache[key]) return []
    Object.keys(deepLocalCache[key]).forEach((subKey) => {
      if (deepLocalCache[key][subKey].includes(value)) {
        result.push(subKey)
      }
    })
    return result
  }
}

export default new Cache()
