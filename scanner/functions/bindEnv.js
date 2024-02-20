function bindEnv () {
  const old = new Map()

  afterEach(() => {
    for (const [key, value] of old) {
      if (value != null) process.env[key] = value
      else delete process.env[key]
    }
    old.clear()
  })

  return function setEnv (key, value) {
    old.set(key, process.env[key])
    process.env[key] = value
  }
}