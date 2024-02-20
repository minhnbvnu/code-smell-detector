function* editStream ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'put',
      url: `${api.projectStream}/${payload.stream.projectId}/streams`,
      data: payload.stream
    })
    yield put(streamEdited(result.payload))
    payload.resolve()
  } catch (err) {
    notifySagasError(err, 'editStream')
  }
}