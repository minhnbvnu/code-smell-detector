function cancelQuestion(questionID) {
  if (ws.readyState == WebSocket.OPEN) {
    ws.send(JSON.stringify({ message: 'cancel', questionID: questionID}));
  }
}