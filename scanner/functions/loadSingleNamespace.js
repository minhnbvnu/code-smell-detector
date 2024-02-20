function loadSingleNamespace (namespaceId, resolve) {
  return {
    type: LOAD_SINGLE_NAMESPACE,
    payload: {
      namespaceId,
      resolve
    }
  }
}