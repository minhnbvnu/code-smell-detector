function makeRequest(path, callback) {
  http.request({ port: port, path: path }, callback).end()
}