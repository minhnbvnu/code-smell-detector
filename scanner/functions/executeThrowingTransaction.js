function executeThrowingTransaction(handledErrorCallback) {
    process.nextTick(() => {
      process.once('uncaughtException', () => {
        const errorTraces = getErrorTraces(agent.errors)
        json = errorTraces[0]

        return handledErrorCallback()
      })

      const disruptor = agent.tracer.transactionProxy(function transactionProxyCb() {
        transaction = agent.getTransaction()
        active = process.domain

        // trigger the error handler
        throw new Error('sample error')
      })

      disruptor()
    })
  }