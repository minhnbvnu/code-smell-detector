function getClientInfo(req, txId) {
  var host;

  if (req.header('X-Forwarded-For')) {
    host = req.header('X-Forwarded-For').split(',').shift().trim();
  } else {
    host = req.connection.remoteAddress;
  }

  return {
    'id' : txId || uuid.v4(),
    'host' : host,
    'date' : Math.floor(new Date().getTime() / 1000),
    'proto' : 'http',
    'reply_to' : '',
    'method' : req.method,
    'content_type' : helper.getMime(req),
    'encoding' : req.encoding,
    'headers' : req.headers
  };
}