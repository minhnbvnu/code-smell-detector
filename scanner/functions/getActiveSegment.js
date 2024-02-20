function getActiveSegment(obj) {
  const segment = this.getSegment(obj)
  if (segment && segment.transaction && segment.transaction.isActive()) {
    return segment
  }
  return null
}