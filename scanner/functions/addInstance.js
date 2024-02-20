function* addInstance ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'post',
      url: api.instance,
      data: {
        connUrl: payload.instance.connectionUrl,
        desc: payload.instance.description === undefined ? '' : payload.instance.description,
        nsSys: payload.instance.instanceDataSystem,
        nsInstance: payload.instance.instance,
        connConfig: payload.instance.connConfig
      }
    })
    if (result.code && result.code === 400) {
      yield put(instanceAddedError(result.msg))
      payload.reject(result.msg)
    } else if (result.header.code && result.header.code === 200) {
      yield put(instanceAdded(result.payload))
      payload.resolve()
    }
  } catch (err) {
    yield put(getError(err))
  }
}