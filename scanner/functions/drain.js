function drain() {
      run('drain')

      helper.runInTransaction(agent, function (tx) {
        p.drain()
          .then(function () {
            t.equal(id(agent.getTransaction()), id(tx), 'should have context through drain')

            return p.clear().then(function () {
              t.equal(id(agent.getTransaction()), id(tx), 'should have context through destroy')
            })
          })
          .then(
            function () {
              t.end()
            },
            function (err) {
              t.error(err)
              t.end()
            }
          )
      })
    }