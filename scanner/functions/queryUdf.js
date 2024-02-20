function* queryUdf ({payload}) {
  try {
    const result = yield call(request, `${api.udf}/${payload.udfId}`)
    yield put(udfDetailLoaded(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    yield put(getError(err))
  }
}