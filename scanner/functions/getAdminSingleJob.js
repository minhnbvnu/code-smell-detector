function* getAdminSingleJob ({ payload }) {
  try {
    const result = yield call(request, `${api.projectList}/${payload.projectId}/jobs`)
    yield put(adminSingleJobLoaded(result.payload))
    payload.resolve()
  } catch (err) {
    notifySagasError(err, 'getAdminSingleJob')
  }
}