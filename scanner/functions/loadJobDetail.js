function loadJobDetail (value, resolve) {
  return {
    type: LOAD_JOB_DETAIL,
    payload: {
      value,
      resolve
    }
  }
}