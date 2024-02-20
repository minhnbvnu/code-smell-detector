function* loadTagsSaga() {
  const expenseTags = yield call(TagsStorage.load, Expense);
  yield put(loadExpenseTagsSuccess(expenseTags));
  const incomeTags = yield call(TagsStorage.load, Income);
  yield put(loadIncomeTagsSuccess(incomeTags));
}