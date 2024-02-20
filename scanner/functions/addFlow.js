function* addFlow ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'post',
      url: `${api.projectUserList}/${payload.values.projectId}/streams/${payload.values.streamId}/flows`,
      data: payload.values
    })
    yield put(flowAdded(result.payload))
    payload.resolve(result.payload)
    payload.final()
  } catch (err) {
    notifySagasError(err, 'addFlow')
  }
}