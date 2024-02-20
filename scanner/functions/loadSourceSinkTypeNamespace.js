function loadSourceSinkTypeNamespace (projectId, streamId, value, type, resolve) {
  return {
    type: LOAD_SOURCESINKTYPE_NAMESPACE,
    payload: {
      projectId,
      streamId,
      value,
      type,
      resolve
    }
  }
}