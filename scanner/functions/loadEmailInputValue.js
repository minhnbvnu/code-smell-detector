function loadEmailInputValue (value, resolve, reject) {
  return {
    type: LOAD_EMAIL_INPUT_VALUE,
    payload: {
      value,
      resolve,
      reject
    }
  }
}