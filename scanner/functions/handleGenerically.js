function handleGenerically(validator) {
  return function handle(req, res, validations, next) {
    validators.redirectedHost(req, validations)
    validator(req.body, validations, function (error, validationList) {
      if (error) {
        return next(error)
      }

      res.send(returnData(validationList, { return_value: {} }))
      return next()
    })
  }
}