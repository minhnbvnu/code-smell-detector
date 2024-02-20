function* getStreamConfigSpark ({ payload }) {
  try {
    const result = yield call(request, `${api.projectStream}/streams/default/config/spark`)
    yield put(streamConfigSparkLoaded(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    notifySagasError(err, 'getStreamConfigSpark')
  }
}