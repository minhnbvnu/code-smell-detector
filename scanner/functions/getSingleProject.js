function* getSingleProject ({ payload }) {
  let requestUrl = ''
  if (localStorage.getItem('loginRoleType') === 'admin') {
    requestUrl = `${api.projectList}`
  } else if (localStorage.getItem('loginRoleType') === 'user') {
    requestUrl = `${api.projectUserList}`
  }
  try {
    const result = yield call(request, `${requestUrl}/${payload.projectId}`)
    yield put(singleProjectLoaded(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    yield put(getError())
  }
}