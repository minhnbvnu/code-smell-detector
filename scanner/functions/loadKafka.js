function loadKafka (projectId, nsSys, resolve) {
  return {
    type: LOAD_KAFKA,
    payload: {
      projectId,
      nsSys,
      resolve
    }
  }
}