function singleNamespaceLoaded (result) {
  return {
    type: LOAD_SINGLE_NAMESPACE_SUCCESS,
    payload: {
      result
    }
  }
}