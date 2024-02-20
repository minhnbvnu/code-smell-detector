function checkTrace(t, tx) {
  const segment = tx.trace.root
  t.equal(segment.name, 'a')
  t.equal(segment.children.length, 0)
  // verify current segment is same as trace root
  t.same(
    segment.name,
    helper.getContextManager().getContext().name,
    'current segment is same as one in async context manager'
  )
  return Promise.resolve()
}