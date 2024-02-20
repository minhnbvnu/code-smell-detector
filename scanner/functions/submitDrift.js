function* submitDrift ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'put',
      url: `${api.projectUserList}/${payload.projectId}/flows/${payload.flowId}/drift`,
      data: {streamId: payload.streamId}
    })
    if (result.header && result.header.code === 200) {
      yield put(flinkFlowStartSucc(result.payload))
    }
    payload.resolve(result.payload)
  } catch (err) {
    notifySagasError(err, 'submitDrift')
  }
}