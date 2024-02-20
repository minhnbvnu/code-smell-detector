async function getRouteModule (path, routeModule) {
  // const isServer = typeof process !== 'undefined'
  if (typeof routeModule === 'function') {
    routeModule = await routeModule()
    return getRouteModuleExports(routeModule)
  } else {
    return getRouteModuleExports(routeModule)
  }
}