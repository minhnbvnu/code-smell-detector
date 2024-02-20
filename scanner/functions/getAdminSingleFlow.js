function* getAdminSingleFlow ({ payload }) {
  try {
    const flow = yield call(request, `${api.projectList}/${payload.projectId}/flows`)
    yield put(adminSingleFlowLoaded(flow.payload))
    payload.resolve()
  } catch (err) {
    yield put(flowsLoadingError(err))
  }
}