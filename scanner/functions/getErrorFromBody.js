function getErrorFromBody(body, statusCode, opts) {
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch (e) {
      const stringBody = body
      body = {}
      body.response = stringBody
    }
  }
  // hide token from logs
  if (opts && opts.headers && opts.headers.Authorization) {
    opts.headers.Authorization = 'Token **********'
  }
  body.statusCode = statusCode
  // log the request options to help debugging
  body.request = opts
  if (body.request && body.request.body && Buffer.isBuffer(body.request.body)) {
    body.request.body = '<Buffer...>'
  }
  return new Error(JSON.stringify(body, null, '  '))
}