function* getSourceLogDetail ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'get',
      url: `${api.flowHdfscompare}/${payload.id}`,
      params: {
        pageIndex: payload.pageIndex,
        pageSize: payload.pageSize
      }
    })
    yield put(sourceLogLoadedDetail(result.paginate.total, result.payload))
    payload.resolve(result.paginate.total, result.payload)
  } catch (err) {
    yield put(sourceLogDetailLoadingError(err))
  }
}