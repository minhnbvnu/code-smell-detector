function inTrans(transaction) {
    const other = tracer.createSegment('other')
    transaction.name = name
    process.once('uncaughtException', function onUncaughtException(err) {
      const logged = agent.errors.traceAggregator.errors[0]
      t.notOk(contextManager.getContext(), 'should not leak transaction into handler')

      t.equal(err, error, 'should have expected error')
      t.equal(Object.keys(error).length, 0, 'error should not have extra properties')
      t.notOk(err[symbols.transaction], 'should not hold onto transaction')

      // global error is not tied to a transaction, so its name should not be
      // the transaction name
      if (t.ok(logged, 'should have a logged error')) {
        t.not(name, logged[1], 'should not have a transaction with the error')
        t.equal(error.message, logged[2], 'should have the error message')
      }
      t.end()
    })
    dangerous(other)()
  }