function* verifyDrift ({ payload }) {
  try {
    const result = yield call(request, `${api.projectUserList}/${payload.projectId}/flows/${payload.flowId}/drift/tip?streamId=${payload.streamId}`)
    payload.resolve(result)
  } catch (err) {
    notifySagasError(err, 'verifyDrift')
  }
}