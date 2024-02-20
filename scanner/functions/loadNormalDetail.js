function loadNormalDetail (userId, resolve) {
  return {
    type: LOAD_NORMAL,
    payload: {
      userId,
      resolve
    }
  }
}