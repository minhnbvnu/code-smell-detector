function checkConnectionUrl (type, url, resolve, reject) {
  return {
    type: CHECK_URL,
    payload: {
      type,
      url,
      resolve,
      reject
    }
  }
}