function* getLastestOffset ({ payload }) {
  let req = null
  if (payload.type === 'get') {
    req = `${api.projectStream}/${payload.projectId}/streams/${payload.streamId}/topics`
  } else if (payload.type === 'post') {
    req = {
      method: 'post',
      url: `${api.projectStream}/${payload.projectId}/streams/${payload.streamId}/topics`,
      data: payload.topics
    }
  }
  try {
    const result = yield call(request, req)
    if (result.code && result.code === 200) {
      yield put(lastestOffsetLoaded(result.msg))
      payload.resolve(result.msg)
    } else if (result.header.code && result.header.code === 200) {
      yield put(lastestOffsetLoaded(result.payload))
      payload.resolve(result.payload)
    }
  } catch (err) {
    notifySagasError(err, 'getLastestOffset')
  }
}