function getParam (req, key) {
    return req.query[key] == null ? req.body[key] : req.query[key]
  }