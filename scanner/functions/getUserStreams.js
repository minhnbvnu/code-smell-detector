function* getUserStreams ({ payload }) {
  try {
    const streams = yield call(request, `${api.projectStream}/${payload.projectId}/streams`)
    yield put(userStreamsLoaded(streams.payload))
    payload.resolve()
  } catch (err) {
    notifySagasError(err, 'getUserStreams')
  }
}