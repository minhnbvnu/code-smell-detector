function* editroleTypeUserPswWatcher () {
  yield fork(takeEvery, EDIT_ROLETYPE_USERPSW, editroleTypeUserPsw)
}