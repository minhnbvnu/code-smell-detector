function loadSourceToSinkExist (projectId, sourceNs, sinkNs, resolve, reject) {
  return {
    type: LOAD_SOURCETOSINK_EXIST,
    payload: {
      projectId,
      sourceNs,
      sinkNs,
      resolve,
      reject
    }
  }
}