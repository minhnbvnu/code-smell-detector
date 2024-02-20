function* getProjectNameInputValue ({ payload }) {
  try {
    const result = yield call(request, `${api.projectList}?name=${payload.value}`)
    if (result.code === 409) {
      yield put(projectNameInputValueErrorLoaded(result.msg))
      payload.reject(result.msg)
    } else {
      yield put(projectNameInputValueLoaded(result.payload))
      payload.resolve()
    }
  } catch (err) {
    yield put(getError(err))
  }
}