function testThrowBehavior(methodName) {
    ptap.test('Promise#' + methodName, function (t) {
      t.plan(3)

      t.test('context', function (t) {
        testPromiseContext(t, function (Promise, name) {
          return Promise.resolve()[methodName](new Error(name))
        })
      })

      t.test('usage', function (t) {
        testPromiseInstanceMethod(t, 1, function throwTest(Promise, p, name) {
          const foo = { what: 'throw test object' }
          return p[methodName](foo)
            .then(function () {
              t.fail(name + 'should not go into resolve handler after throw')
            })
            .catch(function (err) {
              t.equal(err, foo, name + 'should pass throught the correct object')
            })
        })
      })

      t.test('casting', function (t) {
        testPromiseInstanceCastMethod(t, 1, function (t, Promise, p, name, value) {
          return p.thenThrow(value).catch(function (err) {
            t.equal(err, value, 'should have expected error')
          })
        })
      })
    })
  }