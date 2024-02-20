function sendAnnotationConfig(setting, value) {
  if (ws.readyState == WebSocket.OPEN) {
    ws.send(JSON.stringify({ message: 'annotationConfig', setting: setting, value: value }));
  }
}