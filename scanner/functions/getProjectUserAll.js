function* getProjectUserAll ({ payload }) {
  try {
    const users = yield call(request, `${api.projectList}/users`)
    yield put(projectUserAllLoaded(users.payload))
    payload.resolve(users.payload)
  } catch (err) {
    yield put(getError(err))
  }
}