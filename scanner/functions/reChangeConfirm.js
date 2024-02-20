function* reChangeConfirm ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'post',
      url: `${api.projectUserList}/${payload.projectId}/errors/${payload.id}/backfill`,
      data: {protocolType: payload.protocolType}
    })
    if (result.header && result.header.code === 200) {
      yield put(confirmReChangeLoaded(result.payload))
      payload.resolve(result.payload)
    } else {
      yield put(operateFlowError(result.msg, payload.reject))
      payload.reject(result.payload)
    }
  } catch (err) {
    notifySagasError(err, 'reChangeConfirm')
  }
}