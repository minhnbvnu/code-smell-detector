function* getAdminAllUsers ({ payload }) {
  try {
    const users = yield call(request, api.user)
    yield put(adminAllUsersLoaded(users.payload))
    payload.resolve()
  } catch (err) {
    yield put(getError(err))
  }
}