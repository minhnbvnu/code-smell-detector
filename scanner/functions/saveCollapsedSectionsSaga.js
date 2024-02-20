function* saveCollapsedSectionsSaga() {
  const collapsedSections = yield select(getCollapsedSections);
  yield call(SettingsStorage.saveLocal, { collapsedSections });
}