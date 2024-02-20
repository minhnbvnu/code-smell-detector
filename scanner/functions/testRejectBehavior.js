function testRejectBehavior(method) {
    ptap.test('Promise.' + method, function (t) {
      t.plan(3)

      t.test('context', function (t) {
        testPromiseContext(t, function (Promise, name) {
          return Promise[method](name)
        })
      })

      t.test('usage', function (t) {
        testPromiseClassMethod(t, 1, function rejectTest(Promise, name) {
          return Promise[method](name + ' ' + method + ' value').then(
            function () {
              t.fail(name + 'should not resolve after a rejection')
            },
            function (err) {
              t.equal(err, name + ' ' + method + ' value', name + 'should reject with the err')
            }
          )
        })
      })

      t.test('casting', function (t) {
        testPromiseClassCastMethod(t, 1, function (t, Promise, name, value) {
          return Promise[method](value).then(
            function () {
              t.fail(name + 'should not resolve after a rejection')
            },
            function (err) {
              t.equal(err, value, name + 'should reject with correct error')
            }
          )
        })
      })
    })
  }