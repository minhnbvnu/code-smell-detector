function shouldCompressGzip(req) {
  const headers = req.headers;

  return headers && headers['accept-encoding'] &&
    headers['accept-encoding']
      .split(',')
      .some(el => ['*', 'compress', 'gzip', 'deflate'].indexOf(el.trim()) !== -1)
  ;
}