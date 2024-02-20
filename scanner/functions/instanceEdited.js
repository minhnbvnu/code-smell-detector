function instanceEdited (result) {
  return {
    type: EDIT_INSTANCE_SUCCESS,
    payload: {
      result
    }
  }
}