function* initRequest() {
  yield put(setLoading(true));
  yield put(setRequestStatus(null));
}