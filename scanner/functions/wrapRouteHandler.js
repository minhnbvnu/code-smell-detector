function wrapRouteHandler(shim, handler, path) {
  return shim.recordMiddleware(handler, {
    route: path,
    req: function getReq(shim, fn, fnName, args) {
      const [request] = args
      return request?.raw?.req
    },
    promise: true,
    params: function getParams(shim, fn, fnName, args) {
      const [req] = args
      return req?.params
    }
  })
}