function* loadJobNameValue ({ payload }) {
  try {
    const result = yield call(request, `${api.projectUserList}/${payload.projectId}/jobs?jobName=${payload.value}`)
    if (result.code && result.code === 409) {
      yield put(jobNameLoadedError(result.msg))
      payload.reject(result.msg)
    } else if (result.header.code && result.header.code === 200) {
      yield put(jobNameLoaded(result.payload))
      payload.resolve()
    }
  } catch (err) {
    notifySagasError(err, 'loadJobNameValue')
  }
}