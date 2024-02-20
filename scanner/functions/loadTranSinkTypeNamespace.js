function loadTranSinkTypeNamespace (projectId, streamId, value, type, resolve) {
  return {
    type: LOAD_TRANSINKTYPE_NAMESPACE,
    payload: {
      projectId,
      streamId,
      value,
      type,
      resolve
    }
  }
}