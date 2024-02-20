function testAsCallbackBehavior(methodName) {
    ptap.test('Promise#' + methodName, function (t) {
      t.plan(2)

      t.test('context', function (t) {
        testPromiseContext(t, function (Promise, name) {
          return Promise.resolve(name)[methodName](function () {})
        })
      })

      t.test('usage', function (t) {
        testPromiseInstanceMethod(t, 8, function asCallbackTest(Promise, p, name, agent) {
          const startTransaction = agent.getTransaction()
          return p[methodName](function (err, result) {
            const inCallbackTransaction = agent.getTransaction()
            t.equal(
              id(startTransaction),
              id(inCallbackTransaction),
              name + 'should have the same transaction inside the success callback'
            )
            t.notOk(err, name + 'should not have an error')
            t.same(result, [1, 2, 3, name], name + 'should have the correct result value')
          })
            .then(function () {
              throw new Error('Promise#' + methodName + ' test error')
            })
            .then(function () {
              t.fail(name + 'should have skipped then after rejection')
            })
            [methodName](function (err, result) {
              const inCallbackTransaction = agent.getTransaction()
              t.equal(
                id(startTransaction),
                id(inCallbackTransaction),
                name + 'should have the same transaction inside the error callback'
              )
              t.ok(err, name + 'should have error in ' + methodName)
              t.notOk(result, name + 'should not have a result')
              if (err) {
                t.equal(
                  err.message,
                  'Promise#' + methodName + ' test error',
                  name + 'should be the correct error'
                )
              }
            })
            .catch(function (err) {
              t.ok(err, name + 'should have error in catch too')
              // Swallowing error that doesn't get caught in the asCallback/nodeify.
            })
        })
      })
    })
  }