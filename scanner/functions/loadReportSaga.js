function* loadReportSaga() {
  const report = yield select(getReport);
  const base = yield select(getBaseCurrency);
  const exchangeRate = yield select(getExchangeRate);
  const netWorthEnd = report.data.netWorthEnd || (yield select(getNetWorth));
  try {
    const transactions = yield call(
      TransactionsStorage.loadFiltered,
      transactionFilters(report)
    );
    const data = yield call(
      loadReportData,
      report,
      transactions,
      exchangeRate,
      base,
      netWorthEnd
    );
    yield put(loadReportSuccess(data));
  } catch (error) {
    yield put(loadReportFailure(error.message));
  }
}