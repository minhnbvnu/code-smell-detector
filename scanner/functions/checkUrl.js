function checkUrl (value, resolve, reject) {
  return {
    type: CHECK_URL,
    payload: {
      value,
      resolve,
      reject
    }
  }
}