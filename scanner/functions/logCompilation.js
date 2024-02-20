function logCompilation(config, logProgress) {
  let resolveBuildingLog = null
  function storePromiseResolve() {
    if (resolveBuildingLog) {
      resolveBuildingLog()
    }
    return new Promise(resolve => {
      resolveBuildingLog = resolve
    })
  }

  config.plugins.push({
    apply(compiler) {
      compiler.hooks.beforeCompile.tapPromise('start log building', () => {
        logProgress(storePromiseResolve(), 'Compiling the test plugin')
        return Promise.resolve()
      })
    },
  })

  config.plugins.push({
    apply(compiler) {
      compiler.hooks.afterCompile.tapPromise('finish log building', () => {
        if (resolveBuildingLog) {
          resolveBuildingLog()
        }
        return Promise.resolve()
      })
    },
  })
}