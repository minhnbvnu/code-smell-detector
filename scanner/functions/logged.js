function logged (result) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      result
    }
  }
}