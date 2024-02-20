function setUpWebSockets() {
  polyfillLazyGlobal('WebSocket', () => require('WebSocket'));
}