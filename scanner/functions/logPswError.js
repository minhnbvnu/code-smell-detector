function logPswError (message) {
  return {
    type: LOG_PSW_ERROR,
    payload: {
      message
    }
  }
}