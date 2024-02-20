function* getRechargeHistory ({ payload }) {
  try {
    const result = yield call(request, `${api.projectUserList}/${payload.projectId}/errors/${payload.id}/log`)
    yield put(rechargeHistoryLoaded(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    yield put(flowsLoadingError(err))
  }
}