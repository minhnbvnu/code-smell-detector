function* getProjects ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'get',
      url: api.projectList,
      params: payload
    })
    yield put(projectsLoaded(result.payload))
  } catch (err) {
    yield put(getError())
  }
}