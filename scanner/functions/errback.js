function errback(err, result) {
        if (err) {
          reject(err)
        }
        else {
          resolve(result)
        }
      }