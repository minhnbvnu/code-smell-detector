function loadSelectNamespaces (projectId, resolve) {
  return {
    type: LOAD_SELECT_NAMESPACES,
    payload: {
      projectId,
      resolve
    }
  }
}