function modelParseRequest(req, res, next) {
  logger.winston.info('Routing to Model Rasa Parse Request -> ' + global.rasa_endpoint + '/model/parse');
  request({ method: 'POST', uri: global.rasa_endpoint + '/model/parse', body: JSON.stringify(req.body) },
    function (error, response, body) {
      try {
        logger.winston.verbose('Rasa Response: ' + body);
        logs.logRequest(req, 'parse',
          {
            server_response: body,
            query: req.body.q
          });
        sendOutput(200, res, body);
      } catch (err) {
        logger.winston.error(err);
        sendOutput(500, res, '{"error" : ' + err + "}");
      }
    });
}