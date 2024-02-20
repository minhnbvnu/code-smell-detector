function findAllRoutes(router, path) {
  if (!router.stack) {
    return path
  }

  return router.stack.map(function (routerr) {
    return findAllRoutes(routerr.handle, path + ((routerr.route && routerr.route.path) || ''))
  })
}