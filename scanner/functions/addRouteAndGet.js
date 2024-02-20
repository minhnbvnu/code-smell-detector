function addRouteAndGet(t) {
    server.route({
      method: 'GET',
      path: '/test',
      handler: function myHandler() {
        t.ok(agent.getTransaction(), 'transaction is available in route handler')
        return 'ok'
      }
    })

    server
      .start()
      .then(function () {
        port = server.info.port
        helper.makeGetRequest('http://localhost:' + port + '/test', function () {
          t.end()
        })
      })
      .catch(function (err) {
        t.error(err, 'should not fail to start server and request')
        t.end()
      })
  }