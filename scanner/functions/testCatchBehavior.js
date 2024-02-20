function testCatchBehavior(methodName) {
    ptap.test('Promise#' + methodName, function (t) {
      t.plan(2)

      t.test('context', function (t) {
        testPromiseContext(t, function (Promise, name) {
          return Promise.reject(new Error(name))[methodName](function (err) {
            return err
          })
        })
      })

      t.test('usage', function (t) {
        testPromiseInstanceMethod(t, 2, function catchTest(Promise, p, name) {
          return p[methodName](function (err) {
            t.error(err, name + 'should not go into ' + methodName + ' from a resolved promise')
          })
            .then(function () {
              throw new Error('Promise#' + methodName + ' test error')
            })
            [methodName](function (err) {
              t.ok(err, name + 'should pass error into rejection handler')
              t.equal(
                err && err.message,
                'Promise#' + methodName + ' test error',
                name + 'should be correct error'
              )
            })
        })
      })
    })
  }