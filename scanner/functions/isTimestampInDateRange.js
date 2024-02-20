function isTimestampInDateRange (timestamp, startOfSpecifiedDate, endOfSpecifiedDate) {
  if (!timestamp) {
    return false
  }
  timestamp = timestamp * 1000

  // Step 5: Compare the given timestamp with the start and end of the specified date
  return timestamp >= startOfSpecifiedDate && timestamp < endOfSpecifiedDate
}