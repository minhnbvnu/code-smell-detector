function getHostname(request) {
  return request.header('Host').split(/:/)[0]
}