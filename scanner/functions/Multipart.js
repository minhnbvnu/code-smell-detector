function Multipart (request) {
  this.request = request
  this.boundary = uuid()
  this.chunked = false
  this.body = null
}