function* addStream ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'post',
      url: `${api.projectUserList}/${payload.projectId}/streams`,
      data: payload.stream
    })
    yield put(streamAdded(result.payload))
    payload.resolve()
  } catch (err) {
    notifySagasError(err, 'addStream')
  }
}