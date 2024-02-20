function udfEdited (udf) {
  return {
    type: EDIT_UDF_SUCCESS,
    payload: {
      udf
    }
  }
}