function loadLookupSql (values, resolve, reject) {
  return {
    type: LOAD_LOOKUP_SQL,
    payload: {
      values,
      resolve,
      reject
    }
  }
}