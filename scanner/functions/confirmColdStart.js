function confirmColdStart(transaction) {
      const attributes = transaction.trace.attributes.get(ATTR_DEST.TRANS_EVENT)
      t.equal(attributes['aws.lambda.coldStart'], true)
      t.end()
    }