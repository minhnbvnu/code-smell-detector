function createServerAndMakeRequest({ url, expectedData, t, app, pkgVersion }) {
  const http = require('http')
  let requestListener = app

  // connect < v2 was a different module
  // you had to manually call app.handle
  if (semver.satisfies(pkgVersion, '<2')) {
    requestListener = function (req, res) {
      app.handle(req, res)
    }
  }

  const server = http.createServer(requestListener).listen(0, function () {
    const req = http.request(
      {
        port: server.address().port,
        host: 'localhost',
        path: url,
        method: 'GET'
      },
      function onResponse(res) {
        res.on('data', function (data) {
          t.equal(data.toString(), expectedData, 'should respond with proper data')
        })
      }
    )
    req.end()
  })
  return server
}