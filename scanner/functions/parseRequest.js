function parseRequest(input, options, cb) {
  // If the first argument is a URL, merge it into the options object.
  // This code is copied from Node internals.
  if (typeof input === 'string') {
    const urlStr = input
    input = urlToOptions(new URL(urlStr))
  } else if (input.constructor && input.constructor.name === 'URL') {
    input = urlToOptions(input)
  } else {
    cb = options
    options = input
    input = null
  }

  if (typeof options === 'function') {
    cb = options
    options = input || {}
  } else {
    options = Object.assign(input || {}, options)
  }

  return [options, cb]
}