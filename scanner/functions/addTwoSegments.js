function addTwoSegments(transaction) {
  const trace = transaction.trace
  const child1 = (transaction.baseSegment = trace.add('test'))
  child1.start()
  const child2 = child1.add('nested')
  child2.start()
  child1.end()
  child2.end()
  trace.root.end()
}