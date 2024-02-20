function udfEditedError (result) {
  return {
    type: EDIT_UDF_ERROR,
    payload: {
      result
    }
  }
}