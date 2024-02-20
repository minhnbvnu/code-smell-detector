function deleteUser (userId, resolve, reject) {
  return {
    type: DELETE_USER,
    payload: {
      userId,
      resolve,
      reject
    }
  }
}