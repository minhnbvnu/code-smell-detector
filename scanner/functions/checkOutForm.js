function* checkOutForm ({ payload }) {
  payload.value.flowId = parseInt(payload.value.flowId)
  let { taskId, createTsColumn, updateTsColumn, connectUrl } = payload.value
  if (!taskId) {
    taskId = 0
  }

  if (!createTsColumn) {
    createTsColumn = ''
  }

  if (!updateTsColumn) {
    updateTsColumn = ''
  }

  if (!connectUrl) {
    connectUrl = ''
  }

  try {
    const result = yield call(request, {
      method: 'put',
      url: `${api.flowTask}/${payload.flowId}`,
      data: Object.assign(payload.value, {
        taskType: payload.taskType,
        startTime: payload.startDate,
        endTime: payload.endDate
      })
    })
    yield put(formCheckOuted(result.payload))
    payload.resolve()
  } catch (err) {
    yield put(formCheckOutingError(err))
  }
}