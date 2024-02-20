function testRequest(port, param, cb) {
  const url = 'http://localhost:' + port + '/a/b/' + param + '/c'
  helper.makeGetRequest(url, function (err, _response, body) {
    cb(err, body)
  })
}