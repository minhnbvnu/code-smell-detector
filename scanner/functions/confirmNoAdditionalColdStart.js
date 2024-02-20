function confirmNoAdditionalColdStart(transaction) {
      if (transactionNum > 1) {
        const attributes = transaction.trace.attributes.get(ATTR_DEST.TRANS_EVENT)
        const segment = transaction.agent.tracer.getSegment()
        const spanAttributes = segment.attributes.get(ATTR_DEST.SPAN_EVENT)
        t.notOk('aws.lambda.coldStart' in attributes)
        t.notOk('aws.lambda.coldStart' in spanAttributes)
      }

      transactionNum++
    }