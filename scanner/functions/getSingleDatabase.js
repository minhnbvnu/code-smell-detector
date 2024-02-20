function* getSingleDatabase ({ payload }) {
  try {
    const result = yield call(request, `${api.database}/${payload.databaseId}`)
    yield put(singleDatabaseLoaded(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    yield put(getError(err))
  }
}