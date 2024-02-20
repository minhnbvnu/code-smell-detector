function _verifyDestinations(tx) {
      const txTrace = tx.trace.attributes.get(ATTR_DEST.TRANS_TRACE)
      const errEvent = tx.trace.attributes.get(ATTR_DEST.ERROR_EVENT)
      const txEvent = tx.trace.attributes.get(ATTR_DEST.TRANS_EVENT)

      const all = [REQ_ID, LAMBDA_ARN, COLDSTART, EVENTSOURCE_ARN]

      all.forEach((key) => {
        t.not(txTrace[key], undefined)
        t.not(errEvent[key], undefined)
        t.not(txEvent[key], undefined)
      })

      return txTrace
    }