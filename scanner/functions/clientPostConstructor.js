function clientPostConstructor(shim) {
    shim.recordQuery(this, 'query', wrapJSClientQuery)

    shim.record(this, 'connect', function pgConnectNamer() {
      return new specs.QuerySpec({
        name: 'connect',
        callback: shim.LAST
      })
    })
  }