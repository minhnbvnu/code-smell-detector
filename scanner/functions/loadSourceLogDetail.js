function loadSourceLogDetail (id, pageIndex, pageSize, resolve) {
  return {
    type: LOAD_SOURCELOG_DETAIL,
    payload: {
      id,
      pageIndex,
      pageSize,
      resolve
    }
  }
}