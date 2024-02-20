function* checkConnectUrl ({ payload }) {
  try {
    const result = yield call(request, `${api.instance}?type=${payload.value.type}&conn_url=${payload.value.conn_url}`)

    if (result.code && (result.code >= 400)) {
      payload.reject(result.msg)
    } else if (result.header.code && result.header.code === 200) {
      payload.resolve()
    }
  } catch (err) {
    yield put(getError(err))
  }
}