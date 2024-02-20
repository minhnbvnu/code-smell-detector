function tranSinkTypeNamespaceLoaded (result) {
  return {
    type: LOAD_TRANSINKTYPE_NAMESPACE_SUCCESS,
    payload: {
      result
    }
  }
}