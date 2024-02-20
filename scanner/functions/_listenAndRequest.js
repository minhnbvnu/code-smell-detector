function _listenAndRequest(t, route) {
    server.listen(0, function () {
      const port = server.address().port
      const url = 'http://localhost:' + port + route
      helper.makeGetRequest(url, function (error, res, body) {
        t.equal(res.statusCode, 200, 'nothing exploded')
        t.same(body, { status: 'ok' }, 'got expected respose')
      })
    })
  }