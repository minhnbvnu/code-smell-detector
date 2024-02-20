function* getAdminLogs ({ payload }) {
  try {
    const result = yield call(request, `${api.projectList}/${payload.projectId}/streams/${payload.streamId}/logs`)
    yield put(adminLogsInfoLoaded(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    notifySagasError(err, 'getAdminLogs')
  }
}