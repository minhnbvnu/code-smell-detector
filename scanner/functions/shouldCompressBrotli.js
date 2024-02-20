function shouldCompressBrotli(req) {
  const headers = req.headers;

  return headers && headers['accept-encoding'] &&
    headers['accept-encoding']
      .split(',')
      .some(el => ['*', 'br'].indexOf(el.trim()) !== -1)
  ;
}