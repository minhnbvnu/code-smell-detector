function runActionInConversation(req, res, next) {
  logger.winston.info("Rasa Core Run Action Request -> " + global.rasa_endpoint + "/conversations/" + req.body.conversation_id + "/execute");
  try {
    request({ method: "POST", uri: global.rasa_endpoint + "/conversations/" + req.body.conversation_id + "/execute", body: JSON.stringify(req.body.action) }, function (err, response, execute_body) {
      if (err) {
        logger.winston.error(err);
        sendOutput(500, res, '{"error" : "Exception caught !!"}');
        return;
      }
      logger.winston.verbose("Run Action Response" + JSON.stringify(execute_body));
      updateConversation(req.body.conversation_id, execute_body);
      sendOutput(200, res, execute_body);
    });
  } catch (err) {
    logger.winston.error(err);
    sendOutput(500, res, '{"error" : "Exception caught !!"}');
    return;
  }
}