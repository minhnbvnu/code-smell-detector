function* queryLookupSql ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'put',
      url: `${api.projectUserList}/${payload.values.projectId}/streams/${payload.values.streamId}/flows/sqls/lookup`,
      data: payload.values.sql
    })
    if (result.code === 406) {
      yield put(lookupSqlExistedError(result.msg))
      payload.reject(result.msg)
    }
    if (result.code === 200) {
      yield put(lookupSqlExisted(result.payload))
      payload.resolve()
    }
  } catch (err) {
    notifySagasError(err, 'queryLookupSql')
  }
}