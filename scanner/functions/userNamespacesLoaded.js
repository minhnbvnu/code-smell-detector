function userNamespacesLoaded (namespaces) {
  return {
    type: LOAD_USER_NAMESPACES_SUCCESS,
    payload: {
      namespaces
    }
  }
}