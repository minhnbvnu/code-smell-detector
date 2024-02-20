function _post(options, callback) {
  // parse out the options from options.url
  var opts = url.parse(options.url)
  opts.method = 'POST'
  opts.rejectUnauthorized = false
  opts.headers = options.headers || {}
  opts.headers['User-Agent'] = 'tiny-http'

  var req = options.useElectronNet.request(opts) 
  var raw = []

  req.on('response', function _req(response) {
    // these are order dependent??
    response.on('abort', callback)
    response.on('error', callback)
    response.on('login', function _login(auth, login) {
      // if the dev passes in a login function delegate to that
      if (options.login) {
        options.login(auth, login)
      }
      else {
        // otherwise fallback to ctor params if they exist
        // if these are undefined abort gets called
        login(options.username, options.password)
      }
    })
    response.on('end', function _end() {
      var body = JSON.parse(raw.join(''))
      callback(null, {body})
    })
    response.on('data', chunk=> raw.push(chunk))
  })
  req.write(qs.stringify(options.data))
  req.end()
}