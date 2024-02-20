function setCORS(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || '*');
  res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method'] || 'GET,POST,PUT,DELETE,PATCH');
  res.header('Access-Control-Allow-Credentials', true);
  next();
}