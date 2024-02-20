function* getNormal ({ payload }) {
  try {
    const users = yield call(request, `${api.userNormal}/${payload.userId}`)
    yield put(normalDetailLoaded(users.payload))
    payload.resolve(users.payload)
  } catch (err) {
    yield put(getError(err))
  }
}