function requestToJSON () {
  var self = this
  return {
    uri: self.uri,
    method: self.method,
    headers: self.headers
  }
}