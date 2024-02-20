function* getUserJobLogs ({ payload }) {
  try {
    const result = yield call(request, `${api.projectUserList}/${payload.projectId}/jobs/${payload.jobId}/logs`)
    yield put(userJobLogsLoaded(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    notifySagasError(err, 'getUserJobLogs')
  }
}