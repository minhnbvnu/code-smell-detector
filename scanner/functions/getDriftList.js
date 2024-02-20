function* getDriftList ({ payload }) {
  try {
    const result = yield call(request, `${api.projectUserList}/${payload.projectId}/flows/${payload.flowId}/drift/streams`)
    payload.resolve(result.payload)
  } catch (err) {
    notifySagasError(err, 'getDriftList')
  }
}