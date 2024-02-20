function getStore (env) {
  let store = null

  for (const obj of Object.values(env)) {
    if (obj.get && obj.put && obj.delete && obj.list) {
      store = obj
      break
    }
  }

  return store
}