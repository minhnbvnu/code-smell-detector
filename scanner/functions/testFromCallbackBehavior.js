function testFromCallbackBehavior(methodName) {
    ptap.test('Promise.' + methodName, function (t) {
      t.plan(2)

      t.test('context', function (t) {
        testPromiseContext(t, function (Promise, name) {
          return Promise[methodName](function (cb) {
            addTask(cb, null, name)
          })
        })
      })

      t.test('usage', function (t) {
        testPromiseClassMethod(t, 3, function fromCallbackTest(Promise, name) {
          return Promise[methodName](function (cb) {
            addTask(cb, null, 'foobar ' + name)
          })
            .then(function (res) {
              t.equal(res, 'foobar ' + name, name + 'should pass result through')

              return Promise[methodName](function (cb) {
                addTask(cb, new Error('Promise.' + methodName + ' test error'))
              })
            })
            .then(
              function () {
                t.fail(name + 'should not resolve after rejecting')
              },
              function (err) {
                t.ok(err, name + 'should have an error')
                if (err) {
                  t.equal(
                    err.message,
                    'Promise.' + methodName + ' test error',
                    name + 'should have correct error'
                  )
                }
              }
            )
        })
      })
    })
  }