function udfDeleted (result) {
  return {
    type: DELETE_UDF_SUCCESS,
    payload: {
      result
    }
  }
}