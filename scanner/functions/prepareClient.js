async function prepareClient ({
  Root,
  routes: routesPromise,
  context: contextPromise,
  ...others
}) {
  const context = await contextPromise
  const resolvedRoutes = await routesPromise
  return { context, routes: resolvedRoutes, Root }
}