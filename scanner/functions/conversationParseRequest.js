function conversationParseRequest(req, res, next) {
  try {
    logger.winston.info("Routing to Model Rasa Parse Request -> " + global.rasa_endpoint + "/conversations/" + req.body.conversation_id + "/messages");
    request({ method: 'POST', uri: global.rasa_endpoint + "/conversations/" + req.body.conversation_id + "/messages", body: JSON.stringify(req.body) },
      function (err, response, body) {
        try {
          logger.winston.verbose('Rasa Response: ' + body + ' ... ');
          logs.logRequest(req, 'parse',
            {
              server_response: body,
              query: req.body.q
            });

          request({ method: 'POST', uri: global.rasa_endpoint + "/conversations/" + req.body.conversation_id + "/predict", body: JSON.stringify(req.body) }, function (err, response, predict_body) {
            updateConversation(req.body.conversation_id, predict_body);
            sendOutput(200, res, predict_body);
          });
        } catch (err) {
          logger.winston.error(err);
          sendOutput(500, res, '{"error" : ' + err + "}");
        }
      });
  } catch (err) {
    logger.winston.error(err);
  }
}