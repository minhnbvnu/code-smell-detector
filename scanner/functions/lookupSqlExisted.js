function lookupSqlExisted (result) {
  return {
    type: LOAD_LOOKUP_SQL_SUCCESS,
    payload: {
      result
    }
  }
}