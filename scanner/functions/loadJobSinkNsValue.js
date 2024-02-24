function* loadJobSinkNsValue ({ payload }) {
  try {
    const result = yield call(request, `${api.projectUserList}/${payload.projectId}/namespaces?${payload.type}=${payload.value}`)
    if (result.code && result.code !== 200) {
      yield put(jobSinkNsLoadedError(result.msg))
      payload.reject(result.msg)
    } else if (result.header.code && result.header.code === 200) {
      yield put(jobSinkNsLoaded(result.payload))
      payload.resolve(result.payload)
    }
  } catch (err) {
    notifySagasError(err, 'loadJobSinkNsValue')
  }
}