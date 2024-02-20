function* querySchema ({ payload }) {
  let requestURL = ''
  if (localStorage.getItem('loginRoleType') === 'admin') {
    requestURL = api.namespace
  } else if (localStorage.getItem('loginRoleType') === 'user') {
    requestURL = `${api.projectUserList}/${payload.ids.projectId}/namespaces`
  }

  try {
    const result = yield call(request, `${requestURL}/${payload.ids.namespaceId}/schema/${payload.type}`)
    yield put(schemaConfigQueried(result.payload))
    payload.resolve(result.payload)
  } catch (err) {
    yield put(getError())
  }
}