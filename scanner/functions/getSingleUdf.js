function* getSingleUdf ({ payload }) {
  let urlTemp = ''
  if (payload.roleType === 'admin') {
    urlTemp = `${api.projectList}/${payload.projectId}/udfs`
  } else if (payload.roleType === 'user') {
    urlTemp = `${api.projectUserList}/${payload.projectId}/udfs/${payload.type || 'all'}`
  } else if (payload.roleType === 'adminSelect') {
    urlTemp = `${api.projectList}/${payload.projectId}/udfs?public=false`
  }

  try {
    const result = yield call(request, urlTemp)
    yield put(singleUdfLoaded(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    yield put(getError(err))
  }
}