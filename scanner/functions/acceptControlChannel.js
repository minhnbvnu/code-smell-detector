function acceptControlChannel(server, wsRouter, handler) {
  var port = server.port();
  var client = wsRouter.acceptClient(handler);
  var token = client.getToken();
  var addr = publicIp(server);
  var wsPath = wsRouter.path;
  client.url = fmt('ws://%s@%s:%d%s', token, addr, port, wsPath);
  debug('accept container control: %s', client.url);
  return client;
}