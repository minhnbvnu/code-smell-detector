function getPosition() {
  // get the current position from the server
  ws.send(JSON.stringify({ message: 'position' }));
}