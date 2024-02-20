function userAdded (result) {
  return {
    type: ADD_USER_SUCCESS,
    payload: {
      result
    }
  }
}