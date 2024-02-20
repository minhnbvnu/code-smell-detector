function instrumentEventListeners(stream, transaction) {
      const agent = shim.agent
      const config = agent.config

      stream.call.once('callEnd', (statusCode) => {
        transaction.trace.attributes.addAttribute(DESTINATION, 'response.status', statusCode)
        if (shouldTrackError(statusCode, config)) {
          const status = constants.Status[statusCode]
          const error = new Error(`gRPC status code ${statusCode}: ${status}`)
          agent.errors.add(transaction, error)
        }
      })
      stream.call.once('streamEnd', () => {
        transaction.end()
      })
      // TODO should also instrument the 'data' event on the stream
      // object, as that can ensue in lots of processing when the
      // client is streaming. https://issues.newrelic.com/browse/NEWRELIC-1460
    }