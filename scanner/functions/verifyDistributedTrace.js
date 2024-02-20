function verifyDistributedTrace(t, produceTransaction, consumeTransaction) {
  t.ok(produceTransaction.isDistributedTrace, 'should mark producer as distributed')
  t.ok(consumeTransaction.isDistributedTrace, 'should mark consumer as distributed')

  t.equal(consumeTransaction.incomingCatId, null, 'should not set old CAT properties')

  t.equal(produceTransaction.id, consumeTransaction.parentId, 'should have proper parent id')
  t.equal(produceTransaction.traceId, consumeTransaction.traceId, 'should have proper trace id')
  // native promises flatten the segment tree, grab the product segment as 2nd child of root
  let produceSegment =
    NATIVE_PROMISES && produceTransaction.trace.root.children.length > 1
      ? produceTransaction.trace.root.children[1]
      : produceTransaction.trace.root.children[0].children[0]
  produceSegment = produceSegment.children[0] || produceSegment
  t.equal(produceSegment.id, consumeTransaction.parentSpanId, 'should have proper parentSpanId')
  t.equal(consumeTransaction.parentTransportType, 'AMQP', 'should have correct transport type')
}