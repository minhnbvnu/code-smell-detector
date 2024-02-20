function mutateBalance({ accountId, currency, amount }) {
  return accountsDB()
    .get(accountId)
    .then(doc => accountsDB().put(mutateAccountBalance(doc, currency, amount)))
    .then(({ rev }) => accountsDB().get(accountId, rev))
    .then(doc => storageToState(doc));
}