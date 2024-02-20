function namespaceAdded (result) {
  return {
    type: ADD_NAMESPACE_SUCCESS,
    payload: {
      result
    }
  }
}