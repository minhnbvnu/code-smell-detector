function* getDatabases ({ payload }) {
  try {
    const result = yield call(request, api.database)
    yield put(databasesLoaded(result.payload))
    payload.resolve()
  } catch (err) {
    yield put(getError(err))
  }
}