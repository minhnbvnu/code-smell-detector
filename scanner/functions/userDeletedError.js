function userDeletedError (result) {
  return {
    type: DELETE_USER_ERROR,
    payload: {
      result
    }
  }
}