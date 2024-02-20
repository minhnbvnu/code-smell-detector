function loadUserJobLogs (projectId, jobId, resolve) {
  return {
    type: LOAD_USER_JOB_LOGS,
    payload: {
      projectId,
      jobId,
      resolve
    }
  }
}