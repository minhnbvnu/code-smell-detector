function* mapAccountsId(accounts) {
  const idByName = new Map();
  for (const [name, currency] of accounts.entries()) {
    let account = yield select(getAccountByName(name));
    if (!account) account = yield createNewAccount(name, [...currency]);

    idByName.set(name, account.id);
  }

  return idByName;
}