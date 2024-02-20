function getTunnelFn (request) {
  var uri = request.uri
  var proxy = request.proxy
  var tunnelFnName = constructTunnelFnName(uri, proxy)
  return tunnel[tunnelFnName]
}