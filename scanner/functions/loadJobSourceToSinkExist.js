function loadJobSourceToSinkExist (projectId, sourceNs, sinkNs, resolve, reject) {
  return {
    type: LOAD_JOB_SOURCETOSINK_EXIST,
    payload: {
      projectId,
      sourceNs,
      sinkNs,
      resolve,
      reject
    }
  }
}