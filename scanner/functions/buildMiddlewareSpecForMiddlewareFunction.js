function buildMiddlewareSpecForMiddlewareFunction(shim, name, route) {
  return new MiddlewareSpec({
    name,
    route,
    next: shim.LAST,
    params: getParamsFromFastifyRequest,
    req: getRequestFromFastify,
    type: shim.MIDDLEWARE
  })
}