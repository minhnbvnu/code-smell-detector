function* getSelectStreamKafkaTopic ({ payload }) {
  try {
    let type = ''
    let value = ''
    if (payload.streamType === 'flink') {
      type = 'streamType'
      value = payload.streamType
    } else {
      type = 'functionType'
      value = payload.functionType
    }
    const result = yield call(request, `${api.projectUserList}/${payload.projectId}/streams?${type}=${value}`)
    yield put(selectStreamKafkaTopicLoaded(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    notifySagasError(err, 'getSelectStreamKafkaTopic')
  }
}