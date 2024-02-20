function testResolveBehavior(method) {
    ptap.test('Promise.' + method, function (t) {
      t.plan(3)

      t.test('context', function (t) {
        testPromiseContext(t, function (Promise, name) {
          return Promise[method](name)
        })
      })

      t.test('usage', function (t) {
        testPromiseClassMethod(t, 1, function resolveTest(Promise, name) {
          return Promise[method](name + ' ' + method + ' value').then(function (res) {
            t.equal(res, name + ' ' + method + ' value', name + 'should pass the value')
          })
        })
      })

      t.test('casting', function (t) {
        testPromiseClassCastMethod(t, 1, function (t, Promise, name, value) {
          return Promise[method](value).then(function (val) {
            t.deepEqual(val, value, 'should have expected value')
          })
        })
      })
    })
  }