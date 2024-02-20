function responseToJSON () {
  var self = this
  return {
    statusCode: self.statusCode,
    body: self.body,
    headers: self.headers,
    request: requestToJSON.call(self.request)
  }
}