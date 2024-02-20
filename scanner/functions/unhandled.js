function unhandled(transaction) {
      const req = http.get({ host: 'localhost', port: 12345 }, function () {})

      req.on('close', function () {
        t.equal(transaction.exceptions.length, 1)
        t.equal(transaction.exceptions[0].error.code, expectedCode)
        t.end()
      })

      req.end()
    }