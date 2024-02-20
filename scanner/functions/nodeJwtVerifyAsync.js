function nodeJwtVerifyAsync(jwt, verifyKey) {
  return new Promise((resolve, reject) => {
    nodeJsonwebtoken.verify(jwt, verifyKey, (err, token) => {
      if (err) {
        return reject(err)
      }
      resolve(token)
    })
  })
}