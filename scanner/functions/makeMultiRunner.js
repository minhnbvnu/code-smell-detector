function makeMultiRunner(t, endpoint, expectedName, numTests) {
    let done = 0
    const seen = new Set()
    if (!expectedName) {
      expectedName = endpoint
    }
    agent.on('transactionFinished', function (transaction) {
      t.notOk(seen.has(transaction), 'should never see the finishing transaction twice')
      seen.add(transaction)
      t.equal(
        transaction.name,
        'WebTransaction/Expressjs/GET/' + expectedName,
        'transaction has expected name'
      )
      transaction.end()
      if (++done === numTests) {
        done = 0
        t.end()
      }
    })
    return function runMany(server) {
      makeRequest(server, endpoint)
    }
  }