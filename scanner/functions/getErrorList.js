function* getErrorList ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'get',
      url: `${api.projectUserList}/${payload.projectId}/flows/${payload.flowId}/errors`
    })
    if (result.header && result.header.code === 200) {
      payload.resolve(result.payload)
    } else {
      payload.reject(result.payload)
    }
  } catch (err) {
    notifySagasError(err, 'getErrorList')
  }
}