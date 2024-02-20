function loadJobSourceNs (projectId, value, type, resolve, reject) {
  return {
    type: LOAD_JOB_SOURCENS,
    payload: {
      projectId,
      value,
      type,
      resolve,
      reject
    }
  }
}