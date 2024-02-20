function websocket_origin(connection) {
  var origin = connection._options.origin || '*';

  if (origin == '*' || Array.isArray(origin)) {
    origin = connection._req.headers.origin;
  }

  return origin;
}