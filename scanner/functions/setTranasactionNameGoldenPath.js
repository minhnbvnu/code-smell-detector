function setTranasactionNameGoldenPath(cb) {
    let segment = null

    agent.on('transactionFinished', function (finishedTransaction) {
      finishedTransaction.finalizeNameFromUri(TEST_URL, 200)
      segment.markAsWeb(TEST_URL)
      cb(finishedTransaction, segment)
    })

    helper.runInTransaction(agent, function (tx) {
      // grab segment
      agent.tracer.addSegment(NAME, null, null, false, function () {
        // HTTP instrumentation sets URL as soon as it knows it
        segment = agent.tracer.getSegment()
        tx.type = 'web'
        tx.url = TEST_URL
        tx.verb = 'POST'

        // Name the transaction
        api.setTransactionName('Test')

        tx.end()
      })
    })
  }