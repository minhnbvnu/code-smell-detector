function clearLoadedModules(t) {
  let deletedCount = 0
  Object.keys(require.cache).forEach((key) => {
    if (key.indexOf('/ioredis/node_modules/ioredis/') >= 0) {
      delete require.cache[key]
      deletedCount++
    }
  })

  t.comment(`Cleared ${deletedCount} modules matching '*/ioredis/node_modules/ioredis/*'`)
}