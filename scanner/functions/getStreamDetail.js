function* getStreamDetail ({ payload }) {
  const apiFinal = payload.roleType === 'admin'
    ? `${api.projectAdminStream}`
    : `${api.projectStream}`
  try {
    const result = yield call(request, `${apiFinal}/${payload.projectId}/streams/${payload.streamId}`)
    yield put(streamDetailLoaded(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    notifySagasError(err, 'getStreamDetail')
  }
}