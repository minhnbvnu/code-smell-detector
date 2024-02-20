function* editUdf ({payload}) {
  const publicFinal = payload.values.public === 'true'
  try {
    const result = yield call(request, {
      method: 'put',
      url: api.udf,
      data: {
        functionName: payload.values.functionName,
        fullClassName: payload.values.fullName,
        jarName: payload.values && payload.values.jarName || '',
        desc: payload.values.desc,
        pubic: publicFinal,
        id: payload.values.id,
        createTime: payload.values.createTime,
        createBy: payload.values.createBy,
        updateTime: payload.values.updateTime,
        updateBy: payload.values.updateBy,
        streamType: payload.values.streamType,
        mapOrAgg: payload.values.mapOrAgg
      }
    })
    if (result.code && result.code === 412) {
      yield put(udfEditedError(result.msg))
      payload.reject(result.msg)
    } else if (result.header.code && result.header.code === 200) {
      yield put(udfEdited(result.payload))
      payload.resolve()
    }
  } catch (err) {
    yield put(getError(err))
  }
}