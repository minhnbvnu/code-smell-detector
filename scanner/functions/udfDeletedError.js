function udfDeletedError (result) {
  return {
    type: DELETE_UDF_ERROR,
    payload: {
      result
    }
  }
}