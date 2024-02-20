function addQuery(queries, duration, url, query) {
  const transaction = new FakeTransaction(null, url)
  const segment = new FakeSegment(transaction, duration)

  queries.add(segment, 'mysql', query || 'select * from foo where a=2', FAKE_STACK)

  return segment
}