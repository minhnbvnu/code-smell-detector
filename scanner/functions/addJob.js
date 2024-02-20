function* addJob ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'post',
      url: `${api.projectUserList}/${payload.projectId}/jobs`,
      data: payload.values
    })
    yield put(jobAdded(result.payload))
    payload.resolve()
    payload.final()
  } catch (err) {
    notifySagasError(err, 'addJob')
  }
}