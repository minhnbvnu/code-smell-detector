function _testPromiseContext(t, agent, factory) {
  t.plan(4)

  // Create in tx a, continue in tx b
  t.test('context switch', function (t) {
    t.plan(2)

    const ctxA = helper.runInTransaction(agent, function (tx) {
      return {
        transaction: tx,
        promise: factory('[tx a] ')
      }
    })

    helper.runInTransaction(agent, function (txB) {
      t.teardown(function () {
        ctxA.transaction.end()
        txB.end()
      })
      t.notEqual(id(ctxA.transaction), id(txB), 'should not be in transaction a')

      ctxA.promise
        .catch(function () {})
        .then(function () {
          const tx = agent.tracer.getTransaction()
          t.comment('A: ' + id(ctxA.transaction) + ' | B: ' + id(txB))
          t.equal(id(tx), id(ctxA.transaction), 'should be in expected context')
        })
    })
  })

  // Create in tx a, continue outside of tx
  t.test('context loss', function (t) {
    t.plan(2)

    const ctxA = helper.runInTransaction(agent, function (tx) {
      t.teardown(function () {
        tx.end()
      })

      return {
        transaction: tx,
        promise: factory('[tx a] ')
      }
    })

    t.notOk(agent.tracer.getTransaction(), 'should not be in transaction')
    ctxA.promise
      .catch(function () {})
      .then(function () {
        const tx = agent.tracer.getTransaction()
        t.equal(id(tx), id(ctxA.transaction), 'should be in expected context')
      })
  })

  // Create outside tx, continue in tx a
  t.test('context gain', function (t) {
    t.plan(2)

    const promise = factory('[no tx] ')

    t.notOk(agent.tracer.getTransaction(), 'should not be in transaction')
    helper.runInTransaction(agent, function (tx) {
      promise
        .catch(function () {})
        .then(function () {
          const tx2 = agent.tracer.getTransaction()
          t.equal(id(tx2), id(tx), 'should be in expected context')
        })
    })
  })

  // Create test in tx a, end tx a, continue in tx b
  t.test('context expiration', function (t) {
    t.plan(2)

    const ctxA = helper.runInTransaction(agent, function (tx) {
      return {
        transaction: tx,
        promise: factory('[tx a] ')
      }
    })

    ctxA.transaction.end()
    helper.runInTransaction(agent, function (txB) {
      t.teardown(function () {
        ctxA.transaction.end()
        txB.end()
      })
      t.notEqual(id(ctxA.transaction), id(txB), 'should not be in transaction a')

      ctxA.promise
        .catch(function () {})
        .then(function () {
          const tx = agent.tracer.getTransaction()
          t.comment('A: ' + id(ctxA.transaction) + ' | B: ' + id(txB))
          t.equal(id(tx), id(txB), 'should be in expected context')
        })
    })
  })
}