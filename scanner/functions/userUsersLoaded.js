function userUsersLoaded (users) {
  return {
    type: LOAD_USER_USERS_SUCCESS,
    payload: {
      users
    }
  }
}