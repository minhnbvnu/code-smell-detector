function refreshAuth (type, config) {
  return new Promise((resolve, reject) => {
    const provider = require(`./auth-providers/${type}.js`)
    provider.refresh(config)
      .then(result => {
        const auth = {
          bearer: result
        }

        return resolve(auth)
      })
      .catch(err => reject(err))
  })
}