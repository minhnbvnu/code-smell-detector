function connectV2(mongodb, path) {
  return new Promise((resolve, reject) => {
    let server = null
    if (path) {
      server = new mongodb.Server(path)
    } else {
      server = new mongodb.Server(params.mongodb_host, params.mongodb_port, {
        socketOptions: {
          connectionTimeoutMS: 30000,
          socketTimeoutMS: 30000
        }
      })
    }

    const db = new mongodb.Db(DB_NAME, server)

    db.open(function (err) {
      if (err) {
        reject(err)
      }

      resolve({ db, client: null })
    })
  })
}