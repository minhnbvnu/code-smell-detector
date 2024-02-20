function askQuestion(question) {
  if (ws.readyState == WebSocket.OPEN) {
    var questionID = generateGuid();
    ws.send(JSON.stringify({ message: 'question', question: question, questionID: questionID}));
    return questionID;
  }
}