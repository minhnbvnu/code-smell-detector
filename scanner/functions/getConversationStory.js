function getConversationStory(req, res, next) {
  try {
    logger.winston.info("Routing to Model Rasa Story Request -> " + global.rasa_endpoint + "/conversations/" + req.query.conversation_id + "/story");
    request({ method: 'GET', uri: global.rasa_endpoint + "/conversations/" + req.query.conversation_id + "/story" }, function (err, response, body) {
      try {
        logger.winston.verbose('Rasa Response: ' + body.substring(1, 200) + ' ... ');
        logs.logRequest(req, 'parse',
          {
            server_response: body,
            query: req.body.q
          });
        updateStory(req.query.conversation_id, body);
        sendOutput(200, res, body, { 'Content-Type': 'plain/text' }, '');
      } catch (err) {
        logger.winston.error(err);
        sendOutput(500, res, '{"error" : ' + err + "}");
      }
    });
  } catch (err) {
    logger.winston.error(err);
  }
}