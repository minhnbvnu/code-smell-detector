function loadSinkTypeNamespace (projectId, streamId, value, type, resolve) {
  return {
    type: LOAD_SINKTYPE_NAMESPACE,
    payload: {
      projectId,
      streamId,
      value,
      type,
      resolve
    }
  }
}