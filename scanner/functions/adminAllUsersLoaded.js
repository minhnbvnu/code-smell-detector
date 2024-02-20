function adminAllUsersLoaded (users) {
  return {
    type: LOAD_ADMIN_ALL_USERS_SUCCESS,
    payload: {
      users
    }
  }
}