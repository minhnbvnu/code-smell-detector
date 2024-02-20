function* saveTransactionSaga(action) {
  const next = action.payload;
  const prev = yield call(TransactionsStorage.remove, next.id);
  next.id = `T${next.date}-${Date.now()}`;

  yield call(TransactionsStorage.save, next);
  yield call(updateAccountsBalance, prev, next);
  yield call(updateTagsUsage, prev, next);
  yield call(loadRecentTransactionsSaga);
  yield call(loadFilterTransactionsSaga);
  yield call(resetTransactionFormSaga);
  yield put(saveTransactionSuccess());
}