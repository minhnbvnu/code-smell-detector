function* queryUser ({payload}) {
  try {
    const result = yield call(request, `${api.user}/${payload.userId}`)
    yield put(userDetailLoaded(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    yield put(getError(err))
  }
}