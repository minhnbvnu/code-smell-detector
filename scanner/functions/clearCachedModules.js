function clearCachedModules(modules) {
  modules.forEach((moduleName) => {
    try {
      const requirePath = require.resolve(moduleName)
      delete require.cache[requirePath]
      return true
    } catch (e) {
      return false
    }
  })
}