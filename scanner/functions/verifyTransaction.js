function verifyTransaction(t, tx, msg) {
  const seg = tx.agent.tracer.getSegment()
  if (t.ok(seg, 'should have transaction state in ' + msg)) {
    t.equal(seg.transaction.id, tx.id, 'should have correct transaction in ' + msg)
  }
}