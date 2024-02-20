function* getAdminAllUsersWatcher () {
  yield fork(takeLatest, LOAD_ADMIN_ALL_USERS, getAdminAllUsers)
}