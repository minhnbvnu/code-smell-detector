function* queryForm ({ payload }) {
  try {
    const result = yield call(request, `${api.projectUserList}/${payload.values.projectId}/streams/${payload.values.streamId}/flows/${payload.values.id}`)
    yield put(flowQueryed(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    notifySagasError(err, 'queryForm')
  }
}