function verifyAggregateData(t, data) {
  t.equal(data.length, 3, 'should have expected amount of results')
  t.same(data, [{ value: 5 }, { value: 15 }, { value: 25 }], 'should have expected results')
}