function testTryBehavior(method) {
    ptap.test('Promise.' + method, function (t) {
      t.plan(2)

      t.test('context', function (t) {
        testPromiseContext(t, function (Promise, name) {
          return Promise[method](function () {
            return name
          })
        })
      })

      t.test('usage', function (t) {
        testPromiseClassMethod(t, 3, function tryTest(Promise, name) {
          return Promise[method](function () {
            throw new Error('Promise.' + method + ' test error')
          })
            .then(
              function () {
                t.fail(name + 'should not go into resolve after throwing')
              },
              function (err) {
                t.ok(err, name + 'should have error')
                if (err) {
                  t.equal(
                    err.message,
                    'Promise.' + method + ' test error',
                    name + 'should be correct error'
                  )
                }
              }
            )
            .then(function () {
              const foo = { what: 'Promise.' + method + ' test object' }
              return Promise[method](function () {
                return foo
              }).then(function (obj) {
                t.equal(obj, foo, name + 'should also work on success')
              })
            })
        })
      })
    })
  }