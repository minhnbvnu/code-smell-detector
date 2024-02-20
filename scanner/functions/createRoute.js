function createRoute ({ client, handler, errorHandler, route }, scope, config) {
  const onRequest = async function onRequest (req, reply) {
    req.route = await RouteContext.create(
      scope,
      req,
      reply,
      route,
      client.context,
    )
  }
  if (route.getData) {
    // If getData is provided, register JSON endpoint for it
    scope.get(`/-/data${route.path}`, {
      onRequest,
      async handler (req, reply) {
        reply.send(await route.getData(req.route))
      },
    })
  }

  // See https://github.com/fastify/fastify-dx/blob/main/URMA.md
  const hasURMAHooks = Boolean(
    route.getData || route.getMeta || route.onEnter,
  )

  // Extend with route context initialization module
  RouteContext.extend(client.context)

  scope.get(route.path, {
    onRequest,
    // If either getData or onEnter are provided,
    // make sure they run before the SSR route handler
    ...hasURMAHooks && {
      async preHandler (req, reply) {
        try {
          if (route.getData) {
            req.route.data = await route.getData(req.route)
          }
          if (route.getMeta) {
            req.route.head = await route.getMeta(req.route)
          }
          if (route.onEnter) {
            if (!req.route.data) {
              req.route.data = {}
            }
            const result = await route.onEnter(req.route)
            Object.assign(req.route.data, result)
          }
        } catch (err) {
          if (config.dev) {
            console.error(err)
          }
          req.route.error = err
        }
      },
    },
    handler,
    errorHandler,
    ...route,
  })
}