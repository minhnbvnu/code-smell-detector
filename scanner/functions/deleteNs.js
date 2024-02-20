function deleteNs (namespaceId, resolve, reject) {
  return {
    type: DELETE_NS,
    payload: {
      namespaceId,
      resolve,
      reject
    }
  }
}