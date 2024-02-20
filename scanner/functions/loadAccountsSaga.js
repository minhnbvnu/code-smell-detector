function* loadAccountsSaga() {
  const accounts = yield call(AccountsStorage.loadAll);
  yield put(loadAccountsSuccess(accounts));
  const transactionForm = yield select(getForm);
  if (!transactionForm.accountId && accounts.length > 0) {
    yield resetTransactionFormSaga();
  }
}