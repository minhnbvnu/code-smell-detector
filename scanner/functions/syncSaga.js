function* syncSaga() {
  yield put(syncRequest());
  try {
    const readOnly = yield select(isDemoUser);
    yield call(AccountsStorage.sync, readOnly);
    yield call(TransactionsStorage.sync, readOnly);
    yield call(TagsStorage.sync, readOnly);
    yield loadRecentTransactionsSaga();
    yield loadAccountsSaga();
    yield loadTagsSaga();
    yield put(syncSuccess());
  } catch (error) {
    yield put(syncFailure(error));
  }
}