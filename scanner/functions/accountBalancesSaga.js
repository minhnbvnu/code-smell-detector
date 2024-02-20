function * accountBalancesSaga () {
  yield takeLatest(AccountBalancesActions.ACCOUNT_BALANCES_FETCHING, getAccountBalances)
}