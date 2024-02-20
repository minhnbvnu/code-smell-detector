function testFinallyBehavior(methodName) {
    ptap.test('Promise#' + methodName, function (t) {
      t.plan(2)

      t.test('context', function (t) {
        testPromiseContext(t, function (Promise, name) {
          return Promise.resolve(name)[methodName](function () {})
        })
      })

      t.test('usage', function (t) {
        testPromiseInstanceMethod(t, 6, function finallyTest(Promise, p, name) {
          return p[methodName](function () {
            t.equal(arguments.length, 0, name + 'should not receive any parameters')
          })
            .then(function (res) {
              t.same(
                res,
                [1, 2, 3, name],
                name + 'should pass values beyond ' + methodName + ' handler'
              )
              throw new Error('Promise#' + methodName + ' test error')
            })
            [methodName](function () {
              t.equal(arguments.length, 0, name + 'should not receive any parameters')
              t.pass(name + 'should go into ' + methodName + ' handler from rejected promise')
            })
            .catch(function (err) {
              t.ok(err, name + 'should pass error beyond ' + methodName + ' handler')
              if (err) {
                t.equal(
                  err.message,
                  'Promise#' + methodName + ' test error',
                  name + 'should be correct error'
                )
              }
            })
        })
      })
    })
  }