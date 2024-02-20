function getSpanContext() {
  const currentSegment = this.getSegment()
  return currentSegment && currentSegment.getSpanContext()
}