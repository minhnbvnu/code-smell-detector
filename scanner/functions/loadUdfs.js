function loadUdfs (resolve) {
  return {
    type: LOAD_UDFS,
    payload: {
      resolve
    }
  }
}