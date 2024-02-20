function* getNamespaceDatabase ({ payload }) {
  try {
    const database = yield call(request, `${api.instance}/${payload.instanceId}/databases`)
    yield put(namespaceDatabaseLoaded(database.payload))
    payload.resolve(database.payload)
  } catch (err) {
    yield put(getError(err))
  }
}