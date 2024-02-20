function* getSingleInstance ({ payload }) {
  try {
    const result = yield call(request, `${api.instance}/${payload.instanceId}`)
    yield put(singleInstanceLoaded(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    yield put(getError(err))
  }
}