function runTest(cfg) {
    const t = cfg.t
    const endpoint = cfg.endpoint
    const prefix = cfg.prefix || 'Restify'
    const expectedName = `WebTransaction/${prefix}/${cfg.expectedName}`

    agent.on('transactionFinished', (tx) => {
      t.equal(tx.name, expectedName, 'should have correct name')
      ;(cfg.cb && cfg.cb()) || t.end()
    })

    server.listen(() => {
      const port = server.address().port
      helper.makeGetRequest(`http://localhost:${port}${endpoint}`, cfg.requestOpts || null)
    })
  }