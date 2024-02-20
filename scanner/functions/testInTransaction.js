function testInTransaction() {
    runMultiple(
      COUNT,
      function (i, cb) {
        helper.runInTransaction(agent, function transactionWrapper(transaction) {
          const name = '[tx ' + i + '] '
          t.doesNotThrow(function inTXPromiseThrowTest() {
            let isAsync = false
            testFunc(name)
              .finally(function () {
                t.ok(isAsync, name + 'should have executed asynchronously')
              })
              .then(
                function () {
                  t.equal(
                    id(agent.getTransaction()),
                    id(transaction),
                    name + 'has the right transaction'
                  )
                },
                function (err) {
                  if (err) {
                    /* eslint-disable no-console */
                    console.log(err)
                    console.log(err.stack)
                    /* eslint-enable no-console */
                  }
                  t.notOk(err, name + 'should not result in error')
                }
              )
              .finally(cb)
            isAsync = true
          }, name + 'should not throw in a transaction')
        })
      },
      function () {
        t.end()
      }
    )
  }