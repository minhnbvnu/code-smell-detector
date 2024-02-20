function* getLogs ({ payload }) {
  try {
    const result = yield call(request, `${api.projectStream}/${payload.projectId}/streams/${payload.streamId}/logs`)
    yield put(logsInfoLoaded(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    notifySagasError(err, 'getLogs')
  }
}