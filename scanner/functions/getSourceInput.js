function* getSourceInput ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'get',
      url: `${api.flowTask}/${payload.flowId}`,
      params: {
        taskType: payload.taskType
      }
    })
    yield put(sourceInputLoaded(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    yield put(sourceInputLoadingError(err))
  }
}