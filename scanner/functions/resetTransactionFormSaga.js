function* resetTransactionFormSaga() {
  const initialData = yield select(getDefaultState);
  yield put(fillInTransactionForm(initialData));
}