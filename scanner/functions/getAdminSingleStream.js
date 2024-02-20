function* getAdminSingleStream ({ payload }) {
  try {
    const streams = yield call(request, `${api.projectAdminStream}/${payload.projectId}/streams`)
    yield put(adminSingleStreamLoaded(streams.payload))
    payload.resolve()
  } catch (err) {
    notifySagasError(err, 'getAdminSingleStream')
  }
}