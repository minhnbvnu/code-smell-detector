function createRouteHandler (client, scope, config) {
  return function (req, reply) {
    reply.html(reply.render(req))
    return reply
  }
}