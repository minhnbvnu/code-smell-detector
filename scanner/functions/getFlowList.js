function* getFlowList ({ payload }) {
  try {
    const flows = yield call(request, `${api.projectStream}/${payload.projectId}/streams/${payload.streamId}/flows/order`)
    yield put(flowListLoaded(flows.payload.flowPrioritySeq))
    payload.resolve()
  } catch (err) {
    notifySagasError(err, 'getFlowList')
  }
}