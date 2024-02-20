function adminAllNamespacesLoaded (namespaces) {
  return {
    type: LOAD_ADMIN_ALL_NAMESPACES_SUCCESS,
    payload: {
      namespaces
    }
  }
}