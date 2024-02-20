function singleUdfLoaded (udf) {
  return {
    type: LOAD_SINGLE_UDF_SUCCESS,
    payload: {
      udf
    }
  }
}