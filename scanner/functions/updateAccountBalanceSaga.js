function* updateAccountBalanceSaga(mutation) {
  const account = yield call(AccountsStorage.mutateBalance, mutation);
  yield put(updateAccount(account));
}