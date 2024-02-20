function generateInitRequestOpts(req, port, fcHeaders) {
  
  const opts = {
    method: 'POST',
    headers: fcHeaders,
    uri: `http://localhost:${port}/initialize`,
    resolveWithFullResponse: true,
    qs: req.query || {}
  };
  return opts;
}