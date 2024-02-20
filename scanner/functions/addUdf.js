function* addUdf ({payload}) {
  const publicFinal = payload.values.public === 'true'
  try {
    const result = yield call(request, {
      method: 'post',
      url: api.udf,
      data: {
        functionName: payload.values.functionName,
        fullClassName: payload.values.fullName,
        jarName: payload.values && payload.values.jarName || '',
        desc: payload.values.desc,
        streamType: payload.values.streamType,
        public: publicFinal,
        mapOrAgg: payload.values.mapOrAgg
      }
    })
    if (result.code && (result.code === 409 || result.code === 412)) {
      yield put(udfAddedError(result.msg))
      payload.reject(result.msg)
    } else if (result.header.code && result.header.code === 200) {
      yield put(udfAdded(result.payload))
      payload.resolve()
    }
  } catch (err) {
    yield put(getError(err))
  }
}