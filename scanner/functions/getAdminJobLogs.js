function* getAdminJobLogs ({ payload }) {
  try {
    const result = yield call(request, `${api.job}/${payload.jobId}/logs`)
    yield put(adminJobLogsLoaded(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    notifySagasError(err, 'getAdminJobLogs')
  }
}