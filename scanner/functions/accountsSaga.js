function * accountsSaga () {
  yield takeLatest(AccountsActions.ACCOUNTS_FETCHING, getAccounts)
  yield takeLatest(AccountsActions.ACCOUNTS_POLLING, callCreateAccountsPollChannel)
}