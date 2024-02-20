function recordValueInMillis(totalTime, exclusiveTime) {
  this.recordValue(totalTime * FROM_MILLIS, exclusiveTime >= 0 ? exclusiveTime * FROM_MILLIS : null)
}