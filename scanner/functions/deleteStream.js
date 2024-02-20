function* deleteStream ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'put',
      url: `${api.projectStream}/${payload.projectId}/streams/${payload.id}/${payload.action}`
    })
    if (result.code && result.code !== 200) {
      yield put(streamOperatedError(result.msg))
      payload.reject(result.msg)
    } else if (result.code && result.code === 200) {
      yield put(streamDeleted(payload.id))
      payload.resolve()
    }
  } catch (err) {
    notifySagasError(err, 'deleteStream')
  }
}