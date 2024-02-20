function lookupSqlExistedError (result) {
  return {
    type: LOAD_LOOKUP_SQL_ERROR,
    payload: {
      result
    }
  }
}