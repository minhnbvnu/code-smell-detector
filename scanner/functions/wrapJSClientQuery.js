function wrapJSClientQuery(shim, _, __, queryArgs) {
    // As of pg v7.0.0, Client.query returns a Promise from an async call.
    // pg supports event based Client.query when a Query object is passed in,
    // and works similarly in pg version <7.0.0
    if (typeof queryArgs[0] === 'string') {
      return new specs.QuerySpec({
        callback: shim.LAST,
        query: getQuery,
        promise: true,
        parameters: getInstanceParameters(shim, this),
        internal: false
      })
    }

    return new specs.QuerySpec({
      callback: shim.LAST,
      query: getQuery,
      stream: 'row',
      parameters: getInstanceParameters(shim, this),
      internal: false
    })
  }