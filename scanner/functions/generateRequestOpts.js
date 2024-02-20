function generateRequestOpts(req, port, fcReqHeaders, event) {
  const method = req.method;

  const opts = {
    method: method,
    headers: fcReqHeaders,
    uri: `http://localhost:${port}${req.originalUrl}`,
    resolveWithFullResponse: true,
    qs: req.query
  };
  if (event.toString('utf8') !== '') {
    opts.body = event;
  }
  debug('local start request options: %j', opts);
  return opts;
}