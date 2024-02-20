function bindMock () {
  const old = new Map()

  afterEach(() => {
    for (const [host, map] of old) {
      for (const [key, desc] of map) {
        if (desc != null) Reflect.defineProperty(host, key, desc)
        else Reflect.deleteProperty(host, key)
      }
    }
    old.clear()
  })

  return function setMock (host, key, impl) {
    let map = old.get(host)
    if (map == null) old.set(host, map = new Map())
    const desc = Reflect.getOwnPropertyDescriptor(host, key)
    map.set(key, desc)
    const mock = jest.fn(impl)
    Object.defineProperty(host, key, {
      configurable: desc == null || Boolean(desc.configurable),
      enumerable: desc == null || Boolean(desc.enumerable),
      writable: desc == null || Boolean(desc.writable),
      value: mock
    })
    return mock
  }
}