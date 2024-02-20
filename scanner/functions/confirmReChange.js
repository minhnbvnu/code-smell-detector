function confirmReChange (projectId, id, protocolType, resolve, reject) {
  return {
    type: COMFIRM_RECHARGE,
    payload: {
      projectId,
      id,
      protocolType,
      resolve,
      reject
    }
  }
}