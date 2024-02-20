function jobOperatedError (message) {
  return {
    type: OPERATE_JOB_ERROR,
    payload: {
      message
    }
  }
}