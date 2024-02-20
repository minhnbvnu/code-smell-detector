function setCORSHeaders(req, res, next) {

  const origin = req.headers.origin;
  if (origin) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (req.headers['access-control-request-method']) {
    res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
  }

  if (req.headers['access-control-request-headers']) {
    res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
  }

  res.header('Access-Control-Expose-Headers', CORSExposedHeaders);

  if (_.toLower(req.method) === 'options') {
    res.header('Access-Control-Max-Age', CORSMaxAgeSeconds);
    // intercept OPTIONS method
    res.sendStatus(200);
  } else {
    return next();
  }
}