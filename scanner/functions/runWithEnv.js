function runWithEnv(conf, envObj, callback) {
  let saved = {}

  Object.keys(envObj).forEach(function envKey(name) {
    // process.env is not a normal object
    if (Object.hasOwnProperty.call(process.env, name)) {
      saved = process.env[name]
    }

    const value = envObj[name]
    process.env[name] = value
  })
  try {
    const tc = Config.initialize(conf)
    callback(tc)
  } finally {
    Object.keys(envObj).forEach(function restoreEnv(name) {
      if (saved[name]) {
        process.env[name] = saved[name]
      } else {
        delete process.env[name]
      }
    })
  }
}