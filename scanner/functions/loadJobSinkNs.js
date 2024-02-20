function loadJobSinkNs (projectId, value, type, resolve, reject) {
  return {
    type: LOAD_JOB_SINKNS,
    payload: {
      projectId,
      value,
      type,
      resolve,
      reject
    }
  }
}