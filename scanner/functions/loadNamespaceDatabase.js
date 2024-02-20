function loadNamespaceDatabase (instanceId, resolve) {
  return {
    type: LOAD_NAMESPACE_DATABASE,
    payload: {
      instanceId,
      resolve
    }
  }
}