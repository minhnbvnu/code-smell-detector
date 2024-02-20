function getMockTransaction(agent, test, start, durationInSeconds, totalTimeInSeconds) {
  const transaction = new Transaction(agent)

  // non-CAT data
  transaction.name = test.transactionName
  transaction.id = test.transactionGuid
  transaction.type = 'web'

  const durationInMilliseconds = durationInSeconds * 1000
  const totalTimeInMilliseconds = totalTimeInSeconds * 1000

  transaction.timer.start = start

  transaction.timer.getDurationInMillis = function stubDurationInMillis() {
    return durationInMilliseconds
  }

  transaction.trace.getTotalTimeDurationInMillis = function stubTotalTimeInMillis() {
    return totalTimeInMilliseconds
  }

  // CAT data
  if (test.inboundPayload) {
    cat.assignCatToTransaction(test.inboundPayload[0], test.inboundPayload, transaction)
  } else {
    // Simulate the headers being unparsable or not existing
    cat.assignCatToTransaction(null, null, transaction)
  }

  if (test.outboundRequests) {
    test.outboundRequests.forEach(function (req) {
      transaction.pushPathHash(req.expectedOutboundPayload[3])
    })
  }

  transaction.baseSegment = {
    // used by nr.apdexPerfZone
    getDurationInMillis: function () {
      return durationInMilliseconds
    }
  }

  return transaction
}