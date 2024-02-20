function loadUserNamespaces (projectId, resolve) {
  return {
    type: LOAD_USER_NAMESPACES,
    payload: {
      projectId,
      resolve
    }
  }
}