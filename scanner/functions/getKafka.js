function* getKafka ({ payload }) {
  try {
    const result = yield call(request, `${api.projectStream}/${payload.projectId}/instances?nsSys=kafka`)
    yield put(kafkaLoaded(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    notifySagasError(err, 'getKafka')
  }
}