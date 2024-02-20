function userDeleted (result) {
  return {
    type: DELETE_USER_SUCCESS,
    payload: {
      result
    }
  }
}