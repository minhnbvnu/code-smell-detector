function* getNsTableName ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'get',
      url: `${api.namespace}?instanceId=${payload.value.instanceId}&databaseId=${payload.value.databaseId}&tableNames=${payload.value.tableNames}`
    })
    if (result.code === 200) {
      yield put(tableNameExistLoaded(result.msg))
      payload.resolve()
    } else {
      yield put(tableNameExistErrorLoaded(result.msg))
      payload.reject(result.msg)
    }
  } catch (err) {
    yield put(getError(err))
  }
}