function loadSinkWriteRrrorDetail (id, pageIndex, pageSize, resolve) {
  return {
    type: LOAD_SINKWRITERROR_DETAIL,
    payload: {
      id,
      pageIndex,
      pageSize,
      resolve
    }
  }
}