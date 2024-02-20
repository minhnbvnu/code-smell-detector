function runInterval() {
        let count = 0
        let handle
        let id

        function handler() {
          count += 1
          if (count > 2) {
            clearInterval(handle)
          }
          t.ok(agent.getTransaction(), 'transaction should be visible')
          t.equal(id, agent.getTransaction().id, 'transaction ID should be immutable')
        }

        function run() {
          t.ok(agent.getTransaction(), 'transaction should have been created')
          id = agent.getTransaction().id
          handle = setInterval(handler, 50)
        }

        helper.runInTransaction(agent, run)
      }