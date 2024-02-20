function loadJobName (projectId, value, resolve, reject) {
  return {
    type: LOAD_JOB_NAME,
    payload: {
      projectId,
      value,
      resolve,
      reject
    }
  }
}