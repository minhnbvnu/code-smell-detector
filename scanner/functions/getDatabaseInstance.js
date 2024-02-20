function* getDatabaseInstance ({ payload }) {
  try {
    const result = yield call(request, `${api.instance}?type=${payload.value}`)
    yield put(databasesInstanceLoaded(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    yield put(getError(err))
  }
}