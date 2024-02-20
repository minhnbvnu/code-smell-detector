function* getAdminAllJobs ({ payload }) {
  try {
    const result = yield call(request, api.job)
    yield put(adminAllJobsLoaded(result.payload))
    payload.resolve()
  } catch (err) {
    notifySagasError(err, 'getAdminAllJobs')
  }
}