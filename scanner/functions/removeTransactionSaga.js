function* removeTransactionSaga(action) {
  const prev = yield call(TransactionsStorage.remove, action.payload);

  yield call(updateAccountsBalance, prev);
  yield call(updateTagsUsage, prev);
  yield call(loadRecentTransactionsSaga);
  yield call(loadFilterTransactionsSaga);
  yield call(resetTransactionFormSaga);
  yield put(removeTransactionSuccess());
}