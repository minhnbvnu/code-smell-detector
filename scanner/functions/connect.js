function connect(wss, {path, params, msg}) {
  let queryParams = null;
  if (params) {
    queryParams = Object.entries(params)
      .map(p => p.join('='))
      .join('&');
  }

  let url = `ws://localhost:${wss.server.address().port}`;
  if (path) {
    url += path;
  }
  if (queryParams) {
    url += `?${queryParams}`;
  }

  const socket = new WebSocket(url);
  return socket;
}