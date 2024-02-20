function addSegmentInContext(contextManager, transaction, name) {
  const segment = new Segment(transaction, name)
  contextManager.setContext(segment)

  return segment
}