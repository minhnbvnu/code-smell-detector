function* saveAccountSaga(action) {
  const account = action.payload;
  try {
    yield call(AccountsStorage.save, account);
    yield resetTransactionFormSaga();
    yield put(saveAccountSuccess());
  } catch (error) {
    yield put(saveAccountFailure(account.id));
  }
}