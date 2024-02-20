function filterByAccount(docs, accounts) {
  if (Array.isArray(accounts)) accounts = new Set(accounts);
  if (!accounts || !accounts.size) return docs;

  return docs.filter(
    tx => accounts.has(tx.accountId) || accounts.has(tx.linkedAccountId)
  );
}