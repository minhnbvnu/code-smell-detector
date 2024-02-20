function* bootstrapSaga() {
  yield isDemoUser();
  yield isUserLoggedIn();
  yield loadSetting();
  yield syncSaga();
}