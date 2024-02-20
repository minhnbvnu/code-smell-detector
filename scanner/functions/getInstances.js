function* getInstances ({ payload }) {
  try {
    const result = yield call(request, api.instance)
    yield put(instancesLoaded(result.payload))
    payload.resolve()
  } catch (err) {
    yield put(getError(err))
  }
}