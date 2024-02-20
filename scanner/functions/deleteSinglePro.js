function* deleteSinglePro ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'delete',
      url: `${api.projectList}/${payload.projectId}`
    })
    if (result.code === 200) {
      yield put(singleProjectDeleted(payload.projectId))
      payload.resolve()
    } else if (result.code === 412) {
      yield put(singleProjectDeletedError(result.msg))
      payload.reject(result.msg)
    }
  } catch (err) {
    yield put(getError(err))
  }
}