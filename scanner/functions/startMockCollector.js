function startMockCollector(t, startedCallback) {
    const port = 9876
    const opts = {
      port: port
    }

    opts.key = read(join(__dirname, '../lib/test-key.key'))
    opts.cert = read(join(__dirname, '../lib/self-signed-test-certificate.crt'))
    const server = https.createServer(opts, responder)

    server.listen(port, (err) => {
      startedCallback(err, this)
    })

    t.teardown(() => {
      return new Promise((resolve) => {
        server.close(resolve)
      })
    })

    function responder(req, res) {
      const parsed = url.parse(req.url, true)
      t.equal(parsed.query.method, 'preconnect', 'should get redirect host request')
      res.write(JSON.stringify({ return_value: 'some-collector-url' }))
      res.end()
    }
  }