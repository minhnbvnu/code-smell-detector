function* getAdminAllStreams ({ payload }) {
  try {
    const streams = yield call(request, api.stream)
    yield put(adminAllStreamsLoaded(streams.payload))
    payload.resolve()
  } catch (err) {
    notifySagasError(err, 'getAdminAllStreams')
  }
}