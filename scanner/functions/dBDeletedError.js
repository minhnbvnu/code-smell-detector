function dBDeletedError (result) {
  return {
    type: DELETE_DB_ERROR,
    payload: {
      result
    }
  }
}