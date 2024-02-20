function* getPerformances ({ payload }) {
  let requestUrl = ''
  if (payload.roleType === 'admin') {
    requestUrl = `${api.projectList}/${payload.projectId}/monitors`
  } else if (payload.roleType === 'user') {
    requestUrl = `${api.projectUserList}/${payload.projectId}/monitors`
  }

  try {
    const performances = yield call(request, requestUrl)
    yield put(performancesLoaded(performances.payload))
  } catch (err) {
    notifySagasError(err, 'getPerformances')
  }
}