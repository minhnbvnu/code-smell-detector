function doPerformTests(name, resolve, reject, inTx) {
    name += ' ' + (inTx ? 'with' : 'without') + ' transaction'

    t.test(name + ': does not cause JSON to crash', function (t) {
      t.plan(1 * COUNT + 1)

      runMultiple(
        COUNT,
        function (i, cb) {
          if (inTx) {
            helper.runInTransaction(agent, test)
          } else {
            test(null)
          }

          function test(transaction) {
            const p = resolve(Promise).then(end(transaction, cb), end(transaction, cb))
            const d = p.domain
            delete p.domain
            t.doesNotThrow(function () {
              JSON.stringify(p)
            }, 'should not cause stringification to crash')
            p.domain = d
          }
        },
        function (err) {
          t.error(err, 'should not error')
          t.end()
        }
      )
    })

    t.test(name + ': preserves transaction in resolve callback', function (t) {
      t.plan(4 * COUNT + 1)

      runMultiple(
        COUNT,
        function (i, cb) {
          if (inTx) {
            helper.runInTransaction(agent, test)
          } else {
            test(null)
          }

          function test(transaction) {
            resolve(Promise)
              .then(function step() {
                t.pass('should not change execution profile')
                return i
              })
              .then(function finalHandler(res) {
                t.equal(res, i, 'should be the correct value')
                checkTransaction(t, agent, transaction)
              })
              .then(end(transaction, cb), end(transaction, cb))
          }
        },
        function (err) {
          t.error(err, 'should not error')
          t.end()
        }
      )
    })

    t.test(name + ': preserves transaction in reject callback', function (t) {
      t.plan(3 * COUNT + 1)

      runMultiple(
        COUNT,
        function (i, cb) {
          if (inTx) {
            helper.runInTransaction(agent, test)
          } else {
            test(null)
          }

          function test(transaction) {
            const err = new Error('some error ' + i)
            reject(Promise, err)
              .then(function unusedStep() {
                t.fail('should not change execution profile')
              })
              .catch(function catchHandler(reason) {
                t.equal(reason, err, 'should be the same error')
                checkTransaction(t, agent, transaction)
              })
              .then(end(transaction, cb), end(transaction, cb))
          }
        },
        function (err) {
          t.error(err, 'should not error')
          t.end()
        }
      )
    })
  }