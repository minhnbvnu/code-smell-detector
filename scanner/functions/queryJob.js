function* queryJob ({ payload }) {
  try {
    const result = yield call(request, `${api.projectUserList}/${payload.values.projectId}/jobs/${payload.values.jobId}`)
    yield put(jobQueryed(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    notifySagasError(err, 'queryJob')
  }
}