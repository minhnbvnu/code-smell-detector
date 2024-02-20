function handled(transaction) {
      const req = http.get({ host: 'localhost', port: 12345 }, function () {})

      req.on('close', function () {
        t.equal(transaction.exceptions.length, 0)
        unhandled(transaction)
      })

      req.on('error', function (err) {
        t.equal(err.code, expectedCode)
      })

      req.end()
    }