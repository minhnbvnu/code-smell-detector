function receiveAuth() {
  const user = cookie.load('username');
  return {
    type: types.AUTH_LOAD_SUCCESS,
    user
  }
}