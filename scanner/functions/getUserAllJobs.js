function* getUserAllJobs ({ payload }) {
  try {
    const result = yield call(request, `${api.projectUserList}/${payload.projectId}/jobs`)
    yield put(userAllJobsLoaded(result.payload))
    payload.resolve()
  } catch (err) {
    notifySagasError(err, 'getUserAllJobs')
  }
}