function* editProject ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'put',
      url: api.projectList,
      data: payload.project
    })
    if (result.header.code === 200) {
      yield put(projectEdited(result.payload))
      payload.resolve(result.payload)
    }
    if (result.header.code === 406) {
      yield put(projectEditedError(result))
      payload.reject(result)
    }
  } catch (err) {
    yield put(getError(payload.final))
  }
}