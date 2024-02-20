function* refreshReportSaga() {
  yield put(loadReport());
}