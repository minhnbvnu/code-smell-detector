function* updateCurrencySettings(currencies) {
  const base = yield select(getBaseCurrency);
  const secondary = yield select(getSecondaryCurrency);

  yield put(
    changeSettingsCurrency({
      base,
      secondary: union(secondary, [...currencies])
    })
  );
}