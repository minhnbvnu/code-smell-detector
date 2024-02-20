function jobOperated (result) {
  return {
    type: OPERATE_JOB_SUCCESS,
    payload: {
      result
    }
  }
}