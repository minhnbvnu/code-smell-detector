function recordMessageTransaction(segment, scope) {
  const tx = segment.transaction
  if (tx.type !== 'message' || tx.baseSegment !== segment) {
    return
  }

  const duration = segment.getDurationInMillis()
  const exclusive = segment.getExclusiveDurationInMillis()
  const totalTime = segment.transaction.trace.getTotalTimeDurationInMillis()

  if (scope) {
    tx.measure(scope, null, duration, exclusive)
    tx.measure(
      NAMES.MESSAGE_TRANSACTION.TOTAL_TIME + '/' + tx.getName(),
      null,
      totalTime,
      exclusive
    )
  }

  tx.measure(NAMES.MESSAGE_TRANSACTION.RESPONSE_TIME + '/all', null, duration, exclusive)
  tx.measure(NAMES.OTHER_TRANSACTION.RESPONSE_TIME + '/all', null, duration, exclusive)
  tx.measure(NAMES.OTHER_TRANSACTION.TOTAL_TIME, null, totalTime, exclusive)
}