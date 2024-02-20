function markCompleted(questionID) {
  ws.send(JSON.stringify({ message: 'complete', questionID: questionID}));
}