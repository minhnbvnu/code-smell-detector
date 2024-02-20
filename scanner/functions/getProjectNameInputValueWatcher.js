function* getProjectNameInputValueWatcher () {
  yield fork(throttle, 500, LOAD_PROJECT_NAME_VALUE, getProjectNameInputValue)
}