function* getSourceSinkDetail ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'get',
      url: `${api.flowFlowcompare}/${payload.id}`,
      params: {
        pageIndex: payload.pageIndex,
        pageSize: payload.pageSize
      }
    })
    yield put(sourceSinkDetailLoaded(result.paginate.total, result.payload))
    payload.resolve(result.paginate.total, result.payload)
  } catch (err) {
    yield put(sourceSinkDetailLoadingError(err))
  }
}