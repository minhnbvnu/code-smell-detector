function testResult(res, { headers, swapHost }, t) {
      let external = `External/${host}${port}${path}`
      let str = 'Hello from New Relic'
      if (swapHost) {
        external = `External/www.google.com${port}/index.html`
        str = 'Hello from Google'
      }

      const segment = contextManager.getContext()

      t.equal(segment.name, external)
      t.equal(res.statusCode, 200)

      res.on('data', (data) => {
        if (headers) {
          t.equal(res.req.headers.test, 'test')
        }
        t.equal(data.toString(), str)
        t.end()
      })
    }