function sendAnnotation(type, x, y) {
  if (ws.readyState == WebSocket.OPEN) {
    ws.send(JSON.stringify({ message: 'annotation', type: type, x: x, y: y }));
  }
}