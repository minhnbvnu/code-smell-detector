function outer() {
        t.ok(agent.getTransaction(), 'transaction should be visible')
        process.nextTick(function cbNextTick() {
          t.ok(agent.getTransaction(), 'transaction should still be visible')
          inner(function () {
            t.ok(agent.getTransaction(), 'transaction should even still be visible')
          })
        })
      }