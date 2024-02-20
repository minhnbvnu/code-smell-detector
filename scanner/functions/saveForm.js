function* saveForm ({ payload }) {
  let { taskId, createTsColumn, updateTsColumn, connectUrl } = payload.value
  payload.value.flowId = parseInt(payload.value.flowId)
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
      method: 'post',
      url: `${api.flowTask}/${payload.flowId}`,
      data: Object.assign(payload.value, {
        taskType: payload.taskType,
        startTime: '',
        endTime: ''
      })
    })
    yield put(formSaved(result.payload))
    payload.resolve()
  } catch (err) {
    yield put(formSavingError(err))
  }
}