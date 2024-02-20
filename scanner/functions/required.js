function required (props) {
  props = props instanceof Array ? props : [props]
  return function (req, res, next) {
    for (var i = 0; i < props.length; i++) {
      var propExists = req.options[props[i]] != null
      var err = interpretError('ERR_PARAM', { param: props[i] })
      if (!propExists) return handleResponse(q.reject(err), res, 400)
    }
    next()
  }
}