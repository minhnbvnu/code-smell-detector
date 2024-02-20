function* createNewAccount(name, currencies) {
  const account = formTostate({
    name,
    group: defaultGroup,
    balance: currencies.reduce((acc, code) => {
      acc[code] = 0;
      return acc;
    }, {}),
    currencies,
    on_dashboard: false
  });
  yield saveAccountSaga(saveAccount(account));

  return account;
}