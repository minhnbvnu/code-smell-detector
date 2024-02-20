function* editStreamWathcer () {
  yield fork(takeEvery, EDIT_STREAM, editStream)
}