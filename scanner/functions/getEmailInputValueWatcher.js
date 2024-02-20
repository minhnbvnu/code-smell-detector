function* getEmailInputValueWatcher () {
  yield fork(throttle, 500, LOAD_EMAIL_INPUT_VALUE, getEmailInputValue)
}