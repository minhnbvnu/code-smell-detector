function* addDatabase ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'post',
      url: api.database,
      data: payload.database
    })
    if (result.code && result.code === 400) {
      yield put(databaseAddedError(result.msg))
      payload.reject(result.msg)
    } else if (result.header.code && result.header.code === 200) {
      yield put(databaseAdded(result.payload))
      payload.resolve()
    }
  } catch (err) {
    yield put(getError(err))
  }
}