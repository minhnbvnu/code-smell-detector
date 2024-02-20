function webSocketFromArgs(args) {
  const url = urlFromArgs(args);
  return createWebSocket(url);
}