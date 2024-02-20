function* getProjectNsAll ({ payload }) {
  try {
    const result = yield call(request, `${api.projectList}/namespaces`)
    yield put(projectNsAllLoaded(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    yield put(getError())
  }
}