function udfAddedError (result) {
  return {
    type: ADD_UDF_ERROR,
    payload: {
      result
    }
  }
}