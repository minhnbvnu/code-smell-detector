function* getAdminAllFlows ({ payload }) {
  try {
    const flows = yield call(request, api.flow)
    yield put(adminAllFlowsLoaded(flows.payload))
    payload.resolve()
  } catch (err) {
    yield put(flowsLoadingError(err))
  }
}