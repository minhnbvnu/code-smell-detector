function prefixRouteParameters(params) {
  if (params && isObject(params)) {
    return Object.fromEntries(
      Object.entries(params).map(([key, value]) => [`request.parameters.route.${key}`, value])
    )
  }
}