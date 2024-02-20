function dBDeleted (result) {
  return {
    type: DELETE_DB_SUCCESS,
    payload: {
      result
    }
  }
}