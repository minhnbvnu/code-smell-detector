function* getUserProjects () {
  try {
    const result = yield call(request, api.projectUserList)
    yield put(userProjectsLoaded(result.payload))
  } catch (err) {
    yield put(getError())
  }
}