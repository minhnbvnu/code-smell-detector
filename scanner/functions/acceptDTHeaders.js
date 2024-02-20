function acceptDTHeaders(stream, transaction) {
      const metadata = stream.metadata
      Object.entries(metadata.getMap()).forEach(([key, value]) => {
        transaction.trace.attributes.addAttribute(DESTINATION, `request.headers.${key}`, value)
      })

      const headers = Object.create(null)
      headers.tracestate = metadata.get('tracestate').join(',')
      headers.traceparent = metadata.get('traceparent').join(',')
      headers.newrelic = metadata.get('newrelic').join(',')
      transaction.acceptDistributedTraceHeaders('HTTP', headers)
    }