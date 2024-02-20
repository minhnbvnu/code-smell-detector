function sendActivityStatus(status) {
  if (ws.readyState == WebSocket.OPEN) {
    ws.send(JSON.stringify({ message: 'activity', slide: slidenum, status: status }));
  }
}