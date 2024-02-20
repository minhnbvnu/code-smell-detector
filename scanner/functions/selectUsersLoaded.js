function selectUsersLoaded (users) {
  return {
    type: LOAD_SELECT_USERS_SUCCESS,
    payload: {
      users
    }
  }
}