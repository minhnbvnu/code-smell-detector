function loadSourceSinkDetail (id, pageIndex, pageSize, resolve) {
  return {
    type: LOAD_SOURCESINK_DETAIL,
    payload: {
      id,
      pageIndex,
      pageSize,
      resolve
    }
  }
}