function constructProxyHost (uriObject) {
  var port = uriObject.port
  var protocol = uriObject.protocol
  var proxyHost = uriObject.hostname + ':'

  if (port) {
    proxyHost += port
  } else if (protocol === 'https:') {
    proxyHost += '443'
  } else {
    proxyHost += '80'
  }

  return proxyHost
}