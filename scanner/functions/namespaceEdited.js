function namespaceEdited (result) {
  return {
    type: EDIT_NAMESPACE_SUCCESS,
    payload: {
      result
    }
  }
}