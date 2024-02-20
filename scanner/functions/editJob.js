function* editJob ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'put',
      url: `${api.projectUserList}/${payload.values.projectId}/jobs`,
      data: payload.values
    })
    yield put(jobEdited(result.payload))
    payload.resolve()
    payload.final()
  } catch (err) {
    notifySagasError(err, 'editJob')
  }
}