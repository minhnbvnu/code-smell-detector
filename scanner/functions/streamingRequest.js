function streamingRequest(stream, opts) {
  const us = requestWithCallback(opts)

  return new Promise((resolve, reject) => {
    let response
    let body = ''
    stream.on('error', err => reject(err))
    us.on('error', err => reject(err))
    us.on('data', data => {
      body += data.toString()
    })
    us.on('response', res => {
      response = res.toJSON()
    })
    us.on('end', () => {
      const is2xx = /^2/.test(String(response.statusCode))
      if (!is2xx) {
        return reject(getErrorFromBody(body, response.statusCode, opts))
      }
      return resolve(response.body)
    })

    stream.pipe(us)
  })
}