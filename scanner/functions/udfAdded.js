function udfAdded (udf) {
  return {
    type: ADD_UDF_SUCCESS,
    payload: {
      udf
    }
  }
}