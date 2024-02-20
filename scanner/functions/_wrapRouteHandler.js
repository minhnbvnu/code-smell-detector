function _wrapRouteHandler(shim, container, path) {
  if (typeof container.handler !== 'function') {
    return
  }
  shim.wrap(container, 'handler', function wrapHandler(shim, handler) {
    return wrapRouteHandler(shim, handler, path)
  })
}