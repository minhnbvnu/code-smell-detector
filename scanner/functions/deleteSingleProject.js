function deleteSingleProject (projectId, resolve, reject) {
  return {
    type: DELETE_SINGLE_PROJECT,
    payload: {
      projectId,
      resolve,
      reject
    }
  }
}