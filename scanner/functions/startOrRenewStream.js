function* startOrRenewStream ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'put',
      url: `${api.projectStream}/${payload.projectId}/streams/${payload.id}/${payload.action}`,
      data: payload.topicResult
    })
    if (result.code && result.code !== 200) {
      yield put(streamOperatedError(result.msg))
      payload.reject(result.msg)
    } else if (result.header.code && result.header.code === 200) {
      yield put(streamStartOrRenewed(result.payload))
      payload.resolve()
    } else {
      yield put(streamOperatedError(result.payload))
      payload.reject(result.payload)
    }
  } catch (err) {
    notifySagasError(err, 'startOrRenewStream')
  }
}