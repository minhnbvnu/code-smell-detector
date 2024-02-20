function _testPromiseMethod(t, plan, agent, testFunc) {
  const COUNT = 2
  t.plan(plan * 3 + (COUNT + 1) * 3)

  t.doesNotThrow(function outTXPromiseThrowTest() {
    const name = '[no tx] '
    let isAsync = false
    testFunc(name)
      .finally(function () {
        t.ok(isAsync, name + 'should have executed asynchronously')
      })
      .then(
        function () {
          t.notOk(agent.getTransaction(), name + 'has no transaction')
          testInTransaction()
        },
        function (err) {
          if (err) {
            /* eslint-disable no-console */
            console.log(err.stack)
            /* eslint-enable no-console */
          }
          t.notOk(err, name + 'should not result in error')
          t.end()
        }
      )
    isAsync = true
  }, '[no tx] should not throw out of a transaction')

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
}