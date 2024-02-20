function testMiddleware(req, res, next) {
    calls.middleware++
    next()
  }