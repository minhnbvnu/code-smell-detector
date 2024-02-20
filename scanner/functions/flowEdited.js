function flowEdited (result) {
  return {
    type: EDIT_FLOWS_SUCCESS,
    payload: {
      result
    }
  }
}