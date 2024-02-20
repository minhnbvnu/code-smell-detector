function instrumentInterceptors(stream, transaction) {
      const agent = shim.agent
      const config = agent.config
      if (!shim.isWrapped(stream.call.callEventTracker, 'onCallEnd')) {
        shim.wrap(stream.call.callEventTracker, 'onCallEnd', function onCallEnd(shim, orig) {
          return function wrappedOnCallEnd() {
            const args = shim.argsToArray.apply(shim, arguments)
            const [{ code: statusCode }] = args
            transaction.trace.attributes.addAttribute(DESTINATION, 'response.status', statusCode)
            if (shouldTrackError(statusCode, config)) {
              const status = constants.Status[statusCode]
              const error = new Error(`gRPC status code ${statusCode}: ${status}`)
              agent.errors.add(transaction, error)
            }
            transaction.end()
            return orig.apply(this, arguments)
          }
        })
      }
    }