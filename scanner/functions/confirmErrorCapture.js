function confirmErrorCapture() {
      const errors = agent.errors.traceAggregator.errors
      t.equal(errors.length, 1)

      const noticedError = errors[0]
      const [, transactionName, message, type] = noticedError
      t.equal(transactionName, expectedBgTransactionName)
      t.equal(message, errorMessage)
      t.equal(type, 'SyntaxError')

      t.end()
    }