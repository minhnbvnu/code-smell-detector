function verifyCAT(t, produceTransaction, consumeTransaction) {
  t.equal(
    consumeTransaction.incomingCatId,
    produceTransaction.agent.config.cross_process_id,
    'should have the proper incoming CAT id'
  )
  t.equal(
    consumeTransaction.referringTransactionGuid,
    produceTransaction.id,
    'should have the the correct referring transaction guid'
  )
  t.equal(consumeTransaction.tripId, produceTransaction.id, 'should have the the correct trip id')
  t.notOk(
    consumeTransaction.invalidIncomingExternalTransaction,
    'invalid incoming external transaction should be false'
  )
}