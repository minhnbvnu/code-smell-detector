function* getStreamNameValue ({ payload }) {
  try {
    const result = yield call(request, `${api.projectStream}/${payload.projectId}/streams?streamName=${payload.value}`)
    if (result.header && result.header.code === 451) {
      yield put(streamNameValueErrorLoaded(result.payload))
      payload.reject(result.payload)
    } else {
      yield put(streamNameValueLoaded(result.payload))
      payload.resolve()
    }
  } catch (err) {
    notifySagasError(err, 'getStreamNameValue')
  }
}