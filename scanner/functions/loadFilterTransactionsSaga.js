function* loadFilterTransactionsSaga() {
  const filters = yield select(getFilters);
  const transactions = yield call(TransactionsStorage.loadFiltered, filters);
  yield put(loadFilterTransactionsSuccess(transactions));
}