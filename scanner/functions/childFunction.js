function childFunction() {
        return new Promise((resolve) => {
          transaction = agent.getTransaction()
          t.equal(transaction && transaction.id, createdTransaction.id)

          setTimeout(resolve, 1)
        })
      }