function sourceNamespacesLoaded (sourceNamespaces) {
  return {
    type: LOAD_SOURCE_NAMESPACES_SUCCESS,
    payload: {
      sourceNamespaces
    }
  }
}