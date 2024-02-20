function* addUser ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'post',
      url: api.user,
      data: payload.user
    })
    yield put(userAdded(result.payload))
    payload.resolve()
  } catch (err) {
    yield put(getError(err))
  }
}