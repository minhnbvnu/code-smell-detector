function checkTransaction(t, agent, transaction) {
  const currentTransaction = agent.getTransaction()

  if (transaction) {
    t.ok(currentTransaction, 'should be in a transaction')
    if (!currentTransaction) {
      return
    }
    t.equal(currentTransaction.id, transaction.id, 'should be the same transaction')
  } else {
    t.notOk(currentTransaction, 'should not be in a transaction')
    t.pass('') // Make test count match for both branches.
  }
}