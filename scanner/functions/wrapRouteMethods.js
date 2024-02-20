function wrapRouteMethods(shim, route, path) {
  const methods = ['all', 'delete', 'get', 'head', 'opts', 'post', 'put', 'patch']
  shim.wrapMiddlewareMounter(route, methods, { route: path, wrapper: wrapMiddleware })
}