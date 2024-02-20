function* getStreamConfigJvm ({ payload }) {
  try {
    const result = yield call(request, `${api.projectStream}/streams/default/config/jvm`)
    yield put(streamConfigJvmLoaded(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    notifySagasError(err, 'getStreamConfigJvm')
  }
}