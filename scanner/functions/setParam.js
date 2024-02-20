function setParam (paramName) {
  return function (req, res, next, value) {
    if (req.options) req.options[paramName] = value
    req[paramName] = value
    next()
  }
}