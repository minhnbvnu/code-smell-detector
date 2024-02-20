function confirmAgentAttributes(transaction) {
      // verify attributes exist in correct destinations
      const txTrace = _verifyDestinations(transaction)

      // now verify actual values
      t.equal(txTrace[REQ_ID], stubContext.awsRequestId)
      t.equal(txTrace[LAMBDA_ARN], stubContext.invokedFunctionArn)
      t.equal(txTrace[COLDSTART], true)

      t.end()
    }