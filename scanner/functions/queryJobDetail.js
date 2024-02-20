function* queryJobDetail ({ payload }) {
  const apiFinal = payload.value.roleType === 'admin'
    ? `${api.job}/${payload.value.jobId}`
    : `${api.projectUserList}/${payload.value.projectId}/jobs/${payload.value.jobId}`

  try {
    const result = yield call(request, `${apiFinal}`)
    yield put(jobDetailLoaded(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    notifySagasError(err, 'queryJobDetail')
  }
}