function* getSelectUsers ({ payload }) {
  try {
    const users = yield call(request, `${api.projectList}/${payload.projectId}/users`)
    yield put(selectUsersLoaded(users.payload))
    payload.resolve(users.payload)
  } catch (err) {
    yield put(getError(err))
  }
}