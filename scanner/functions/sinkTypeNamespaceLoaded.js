function sinkTypeNamespaceLoaded (result) {
  return {
    type: LOAD_SINKTYPE_NAMESPACE_SUCCESS,
    payload: {
      result
    }
  }
}