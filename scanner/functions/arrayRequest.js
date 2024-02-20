function arrayRequest() {
        addSegment()

        const port = server.address().port
        const req = http.request(
          {
            host: 'localhost',
            port: port,
            headers: [
              ['a', 1],
              ['b', 2]
            ]
          },
          function (res) {
            res.resume()
            expectRequest()
          }
        )
        req.end()
      }