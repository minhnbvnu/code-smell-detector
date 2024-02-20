function websocket_location(connection) {
  if (connection._req.headers['host'] === undefined) {
    connection.reject('Missing host header');
    return;
  }

  var location = '',
      secure = connection._socket.secure,
      host = connection._req.headers.host.split(':'),
      port = host[1] !== undefined ? host[1] : (secure ? 443 : 80);

  location += secure ? 'wss://' : 'ws://';
  location += host[0];

  if (!secure && port != 80 || secure && port != 443) {
    location += ':' + port;
  }

  location += connection._req.url;

  return location;
}