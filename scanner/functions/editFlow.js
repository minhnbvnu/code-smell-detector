function* editFlow ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'put',
      url: `${api.projectUserList}/${payload.values.projectId}/streams/${payload.values.streamId}/flows`,
      data: payload.values
    })
    yield put(flowEdited(result.payload))
    payload.resolve()
    payload.final()
  } catch (err) {
    notifySagasError(err, 'editFlow')
  }
}