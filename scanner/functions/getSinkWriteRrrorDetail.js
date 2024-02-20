function* getSinkWriteRrrorDetail ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'get',
      url: `${api.flowSinkwriteerror}/${payload.id}`,
      params: {
        pageIndex: payload.pageIndex,
        pageSize: payload.pageSize
      }
    })
    yield put(sinkWriteRrrorDetailLoaded(result.paginate.total, result.payload))
    payload.resolve(result.paginate.total, result.payload)
  } catch (err) {
    yield put(sinkWriteRrrorDetailLoadingError(err))
  }
}