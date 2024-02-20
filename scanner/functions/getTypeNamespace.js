function* getTypeNamespace ({ payload }) {
  try {
    const result = yield call(request, `${api.projectUserList}/${payload.projectId}/streams/${payload.streamId}/namespaces?${payload.type}=${payload.value}`)
    if (result.code) {
      return
    } else if (result.header.code || result.header.code === 200) {
      yield put(sourceSinkTypeNamespaceLoaded(result.payload))
      payload.resolve(result.payload)
    }
  } catch (err) {
    notifySagasError(err, 'getTypeNamespace')
  }
}