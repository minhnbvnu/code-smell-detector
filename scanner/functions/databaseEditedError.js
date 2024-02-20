function databaseEditedError (result) {
  return {
    type: EDIT_DATABASE_ERROR,
    payload: {
      result
    }
  }
}