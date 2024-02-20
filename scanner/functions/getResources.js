function* getResources ({ payload }) {
  let requestUrl = ''
  if (payload.roleType === 'admin') {
    requestUrl = `${api.projectList}/${payload.projectId}/resources`
  } else if (payload.roleType === 'user') {
    requestUrl = `${api.projectUserList}/${payload.projectId}/resources`
  }
  try {
    const resources = yield call(request, requestUrl)
    yield put(resourcesLoaded(resources.payload))
  } catch (err) {
    notifySagasError(err, 'getResources')
  }
}