function* setPriority ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'put',
      url: `${api.projectStream}/${payload.projectId}/streams/${payload.streamId}/flows/order`,
      data: payload.flows
    })
    if (result.header && result.header.code !== 200) {
      yield put(streamOperatedError(result.msg))
      payload.reject(result.msg)
    } else if (result.header && result.header.code === 200) {
      yield put(flowListOfPrioritySubmited(result.payload))
      payload.resolve()
    }
  } catch (err) {
    notifySagasError(err, 'setPriority')
  }
}