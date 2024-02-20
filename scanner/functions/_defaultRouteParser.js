function _defaultRouteParser(shim, fn, fnName, route) {
  if (route instanceof RegExp) {
    return '/' + route.source + '/'
  } else if (typeof route === 'string') {
    return route
  }

  return '<unknown>'
}