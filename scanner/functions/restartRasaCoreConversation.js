function restartRasaCoreConversation(req, res, next) {
  logger.winston.info("Rasa Core Restart Request -> " + global.rasa_endpoint + "/conversations/" + req.body.conversation_id + "/tracker/events");
  try {
    var body = JSON.stringify({ "event": "restart" });
    request({ method: "POST", uri: global.rasa_endpoint + "/conversations/" + req.body.conversation_id + "/tracker/events", body: body }, function (err, response, body) {
      if (err) {
        logger.winston.error(err);
        sendOutput(500, res, '{"error" : "Exception caught !!"}');
        return;
      }
      logger.winston.verbose("Restart Response" + JSON.stringify(body));
      updateConversation(req.body.conversation_id, body);
      sendOutput(200, res, body);
    });
  } catch (err) {
    logger.winston.error(err);
    sendOutput(500, res, '{"error" : "Exception caught !!"}');
    return;
  }
}