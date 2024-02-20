function* completeSetupSaga() {
  yield call(SettingsStorage.save, { isSetupComplete: true });
}