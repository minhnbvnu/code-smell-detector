function instanceEditedError (result) {
  return {
    type: EDIT_INSTANCE_ERROR,
    payload: {
      result
    }
  }
}