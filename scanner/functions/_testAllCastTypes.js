function _testAllCastTypes(t, plan, agent, testFunc) {
  const values = [42, 'foobar', {}, [], function () {}]

  t.plan(2)
  t.test('in context', function (t) {
    t.plan(plan * values.length + 1)

    helper.runInTransaction(agent, function (tx) {
      _test(t, '[no-tx]', 0)
        .then(function () {
          const txB = agent.tracer.getTransaction()
          t.equal(id(tx), id(txB), 'should maintain transaction state')
        })
        .catch(function (err) {
          t.error(err)
        })
        .then(t.end)
    })
  })

  t.test('out of context', function (t) {
    t.plan(plan * values.length)
    _test(t, '[no-tx]', 0)
      .catch(function (err) {
        t.error(err)
      })
      .then(t.end)
  })

  function _test(t, name, i) {
    const val = values[i]
    t.comment(typeof val === 'function' ? val.toString() : JSON.stringify(val))
    return testFunc(t, name, val).then(function () {
      if (++i < values.length) {
        return _test(t, name, i)
      }
    })
  }
}