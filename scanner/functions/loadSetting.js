function* loadSetting() {
  const settings = yield call(SettingsStorage.load);
  yield put(loadSettingsSuccess(settings));
}