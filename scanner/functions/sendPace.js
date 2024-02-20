function sendPace(pace) {
  if (ws.readyState == WebSocket.OPEN) {
    ws.send(JSON.stringify({ message: 'pace', pace: pace}));
  }
}