function* deleteStrategyArchive(accountId) {
  yield call(AccountsStorage.archive, accountId);
  yield put(removeAccountSuccess(accountId));
}