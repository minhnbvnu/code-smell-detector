function* queryFlow ({ payload }) {
  const apiFinal = payload.value.roleType === 'admin'
    ? `${api.projectList}/${payload.value.projectId}/flows/${payload.value.flowId}`
    : `${api.projectUserList}/${payload.value.projectId}/streams/${payload.value.streamId}/flows/${payload.value.flowId}`
  try {
    const result = yield call(request, apiFinal)
    yield put(flowDetailLoad(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    notifySagasError(err, 'queryFlow')
  }
}