function _execFactory(options) {
  // returns an exec function with options.username and options.password passed in
  return function __exec(url, form, callback) {
    var err = validate(url, form)
    if (err) {
      callback(err)
    }
    else {
      // stringify any objects under keys since form is posted as application/x-www-form-urlencoded
      Object.keys(form).forEach(function (key) {
        if (typeof form[key] === 'object') {
          form[key] = JSON.stringify(form[key])
        }
      })
      // setup post params
      var params = {
        url: `${origin}/api/${url}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: form
      }
      // add optionals
      if (options) {
        params = Object.assign({}, params, options) 
      }
      _post(params, function _res(err, res) {
        if (err) {
          callback(err)
        }
        else if (res.statusCode === 429) {
          var e = Error('ratelimited')
          e.retry = res.headers['retry-after']
          callback(e)
        }
        else if (res.body && res.body.error) {
          var e = Error(res.body.error)
          if (res.body.response_metadata && res.body.response_metadata.messages) {
            e.messages = res.body.response_metadata.messages
          }
          callback(e)
        }
        else {
          callback(null, res.body)
        }
      })
    }
  }
}