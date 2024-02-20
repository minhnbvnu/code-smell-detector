function storePromiseResolve() {
    if (resolveBuildingLog) {
      resolveBuildingLog()
    }
    return new Promise(resolve => {
      resolveBuildingLog = resolve
    })
  }