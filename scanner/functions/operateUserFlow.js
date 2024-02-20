function* operateUserFlow ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'put',
      url: `${api.projectUserList}/${payload.values.projectId}/actions`,
      data: {
        action: payload.values.action,
        flowIds: payload.values.flowIds
      }
    })
    if (result.code && result.code !== 200) {
      yield put(operateFlowError(result.msg, payload.reject))
      payload.reject(result.msg)
    } else if (result.header.code && result.header.code === 200) {
      if (payload.values.action === 'delete') {
        yield put(userFlowOperated(payload.values.flowIds))
        payload.resolve(payload.values.flowIds)
      } else {
        const temp = payload.values.flowIds.split(',')
        if (temp.length === 1) {
          yield put(userFlowOperated(result.payload[0]))
          payload.resolve(result.payload[0])
        } else if (temp.length > 1) {
          yield put(userFlowOperated(result.payload))
          payload.resolve(result.payload)
        }
      }
    }
  } catch (err) {
    notifySagasError(err, 'operateUserFlow')
  }
}