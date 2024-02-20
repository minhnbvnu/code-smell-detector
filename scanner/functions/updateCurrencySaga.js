function* updateCurrencySaga() {
  const base = yield select(getBaseCurrency);
  const secondary = yield select(getSecondaryCurrency);
  const used = yield select(getAccountsCurrencyList);
  try {
    const exchangeRate = yield call(
      fetchExchangeRates,
      base,
      union(secondary, used)
    );
    yield put(updateExchangeRateSuccess(exchangeRate));
    yield call(SettingsStorage.save, {
      currency: { base, secondary },
      exchangeRate
    });
  } catch (error) {
    yield put(updateExchangeRateFailure(error));
  }
}