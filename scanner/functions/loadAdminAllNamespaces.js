function loadAdminAllNamespaces (resolve) {
  return {
    type: LOAD_ADMIN_ALL_NAMESPACES,
    payload: {
      resolve
    }
  }
}