function* stopFlinkFlow ({payload}) {
  try {
    const result = yield call(request, {
      method: 'put',
      url: `${api.projectStream}/${payload.projectId}/flinkstreams/flows/${payload.id}/stop`,
      data: null
    })
    if (result.code && result.code !== 200) {
      yield put(flowOperatedError(result.msg))
      payload.reject(result.msg)
    } else if (result.header.code && result.header.code === 200) {
      yield put(flinkFlowStartSucc(result.payload))
      payload.resolve()
    } else {
      yield put(flowOperatedError(result.payload))
      payload.reject(result.payload)
    }
  } catch (err) {
    notifySagasError(err, 'stopFlinkFlow')
  }
}