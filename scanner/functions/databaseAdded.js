function databaseAdded (result) {
  return {
    type: ADD_DATABASE_SUCCESS,
    payload: {
      result
    }
  }
}