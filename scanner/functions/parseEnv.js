function parseEnv(name, def) {
  if (envIsSet(name)) {
    try {
      return JSON.parse(process.env[name])
    } catch (err) {
      return process.env[name]
    }
  }
  return def
}