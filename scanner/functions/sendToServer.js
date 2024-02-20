function sendToServer(msg) {
  var msgJSON = JSON.stringify(msg);

  log("Sending '" + msg.type + "' message: " + msgJSON);
  connection.send(msgJSON);
}