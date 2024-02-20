function archive(accountId) {
  return accountsDB()
    .get(accountId)
    .then(doc => accountsDB().put({ ...doc, archived: true }));
}