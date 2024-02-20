function joinAccount(transaction, accounts) {
  const account = EntityMap.get(accounts, transaction.accountId);
  const linked = EntityMap.get(accounts, transaction.linkedAccountId);
  return {
    ...transaction,
    archived: account.archived || linked.archived,
    accountName: account.name,
    linkedAccountName: linked.name
  };
}