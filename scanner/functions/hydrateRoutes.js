async function hydrateRoutes (from) {
  if (Array.isArray(from)) {
    from = Object.fromEntries(
      from.map((route) => [route.path, route]),
    )
  }
  return window.routes.map((route) => {
    route.loader = memoImport(from[route.id])
    route.component = () => route.loader()
    return route
  })
}