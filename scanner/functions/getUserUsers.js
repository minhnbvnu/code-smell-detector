function* getUserUsers ({ payload }) {
  try {
    const users = yield call(request, `${api.projectUserList}/${payload.projectId}/users`)
    yield put(userUsersLoaded(users.payload))
    payload.resolve()
  } catch (err) {
    yield put(getError(err))
  }
}