function* operateUserJob ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'put',
      url: `${api.projectUserList}/${payload.values.projectId}/jobs/${Number(payload.values.jobId)}/${payload.values.action}`
    })
    if (payload.values.action === 'delete') {
      if (result.code && result.code !== 200) {
        yield put(jobOperatedError(result.msg))
        payload.reject(result.msg)
      } else if (result.code && result.code === 200) {
        yield put(jobOperated(Number(payload.values.jobId), payload.resolve))
        payload.resolve(Number(payload.values.jobId))
      }
    } else {
      if (result.code && result.code !== 200) {
        yield put(jobOperatedError(result.msg))
        payload.reject(result.msg)
      } else if (result.header.code && result.header.code === 200) {
        yield put(jobOperated(result.payload, payload.resolve))
        payload.resolve(result.payload)
      }
    }
  } catch (err) {
    notifySagasError(err, 'operateUserJob')
  }
}