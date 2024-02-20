function* editDatabase ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'put',
      url: api.database,
      data: payload.database
    })
    if (result.code && result.code === 400) {
      yield put(databaseEditedError(result.msg))
      payload.reject(result.msg)
    } else if (result.header.code && result.header.code === 200) {
      yield put(databaseEdited(result.payload))
      payload.resolve()
    }
  } catch (err) {
    yield put(getError(err))
  }
}