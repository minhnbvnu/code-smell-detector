function* loadRecentTransactionsSaga() {
  const transactions = yield call(TransactionsStorage.loadRecent);
  yield put(loadRecentTransactionsSuccess(transactions));
}