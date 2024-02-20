function udfDetailLoaded (result) {
  return {
    type: LOAD_UDF_DETAIL_SUCCESS,
    payload: {
      result
    }
  }
}