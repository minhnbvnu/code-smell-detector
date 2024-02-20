function makeFilterAssertions(t, filter) {
  // Filters down from global rules
  t.equal(filter.filterTransaction(DESTS.TRANS_SCOPE, 'a'), DESTS.TRANS_COMMON, 'a -> common')
  t.equal(filter.filterTransaction(DESTS.TRANS_SCOPE, 'ab'), DESTS.TRANS_EVENT, 'ab -> common')
  t.equal(filter.filterTransaction(DESTS.TRANS_SCOPE, 'abc'), DESTS.NONE, 'abc -> common')

  // Filters down from destination rules.
  t.equal(filter.filterTransaction(DESTS.TRANS_SCOPE, 'b'), DESTS.TRANS_COMMON, 'b -> common')
  t.equal(filter.filterTransaction(DESTS.TRANS_SCOPE, 'bc'), DESTS.LIMITED, 'bc -> common')
  t.equal(filter.filterTransaction(DESTS.TRANS_SCOPE, 'bcd'), DESTS.TRANS_COMMON, 'bcd -> common')
  t.equal(filter.filterTransaction(DESTS.TRANS_SCOPE, 'bcde'), DESTS.TRANS_COMMON, 'bcde -> common')

  // Adds destinations on top of defaults.
  t.equal(filter.filterTransaction(DESTS.NONE, 'a'), DESTS.TRANS_COMMON, 'a -> none')
  t.equal(filter.filterTransaction(DESTS.NONE, 'ab'), DESTS.TRANS_EVENT, 'ab -> none')
}