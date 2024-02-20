function confirmEndCallback() {
        t.equal(transaction.isActive(), false)

        const currentTransaction = agent.tracer.getTransaction()
        t.equal(currentTransaction, null)
        t.end()
      }