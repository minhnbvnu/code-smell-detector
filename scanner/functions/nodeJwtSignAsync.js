function nodeJwtSignAsync(jwtPayload, signKey) {
  return new Promise((resolve, reject) => {
    nodeJsonwebtoken.sign(jwtPayload, signKey, (err, token) => {
      if (err) {
        return reject(err)
      }
      resolve(token)
    })
  })
}