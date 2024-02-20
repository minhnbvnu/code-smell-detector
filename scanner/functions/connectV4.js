function connectV4(mongodb, host, replicaSet = false) {
  return new Promise((resolve, reject) => {
    if (host) {
      host = encodeURIComponent(host)
    } else {
      host = params.mongodb_v4_host + ':' + params.mongodb_v4_port
    }

    let connString = `mongodb://${host}`
    let options = {}

    if (replicaSet) {
      connString = `mongodb://${host},${host},${host}`
      options = { useNewUrlParser: true, useUnifiedTopology: true }
    }
    mongodb.MongoClient.connect(connString, options, function (err, client) {
      if (err) {
        reject(err)
      }

      const db = client.db(DB_NAME)
      resolve({ db, client })
    })
  })
}