function* getSourceNsVersion ({ payload }) {
  try {
    const result = yield call(request, `${api.projectUserList}/${payload.projectId}/jobs/dataversions?namespace=${payload.namespace}`)
    payload.resolve(result.payload)
  } catch (err) {
    payload.resolve('')
    notifySagasError(err, 'getSourceNsVersion')
  }
}