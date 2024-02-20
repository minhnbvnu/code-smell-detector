function expectRequest() {
        addSegment()

        const port = server.address().port
        const req = http.request(
          {
            host: 'localhost',
            port: port,
            headers: { a: 1, b: 2, expect: '100-continue' }
          },
          function (res) {
            res.resume()
            endTest()
          }
        )
        req.end()
      }