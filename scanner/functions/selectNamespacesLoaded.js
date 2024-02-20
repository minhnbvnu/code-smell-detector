function selectNamespacesLoaded (namespaces) {
  return {
    type: LOAD_SELECT_NAMESPACES_SUCCESS,
    payload: {
      namespaces
    }
  }
}