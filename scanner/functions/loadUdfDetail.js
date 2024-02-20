function loadUdfDetail (udfId, resolve) {
  return {
    type: LOAD_UDF_DETAIL,
    payload: {
      udfId,
      resolve
    }
  }
}