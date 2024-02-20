function getAccount(row) {
  const account = row[COLUMN.ACCOUNT];
  const currency = row[COLUMN.CURRENCY];
  if (!accounts.has(account)) accounts.set(account, new Set());
  const accountCurrencies = accounts.get(account);
  if (!accountCurrencies.has(currency)) accountCurrencies.add(currency);
  if (!currencies.has(currency)) currencies.add(currency);

  return account;
}