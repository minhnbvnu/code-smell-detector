function loadUserDetail (userId, resolve) {
  return {
    type: LOAD_USER_DETAIL,
    payload: {
      userId,
      resolve
    }
  }
}