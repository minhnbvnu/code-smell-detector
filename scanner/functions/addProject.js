function* addProject ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'post',
      url: api.projectList,
      data: payload.project
    })
    yield put(projectAdded(result.payload))
    payload.resolve()
    payload.final()
  } catch (err) {
    yield put(getError(payload.final))
  }
}