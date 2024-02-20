function sendFeedback(rating, feedback) {
  if (ws.readyState == WebSocket.OPEN) {
    var slide  = $("#slideFilename").text();
    ws.send(JSON.stringify({ message: 'feedback', rating: rating, feedback: feedback, slide: slide}));
    $("input:radio[name=rating]:checked").attr('checked', false);
  }
}