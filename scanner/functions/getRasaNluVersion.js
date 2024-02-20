function getRasaNluVersion(req, res, next) {
  logger.winston.info('Rasa NLU Version Request -> ' + global.rasa_endpoint + '/version');
  request(global.rasa_endpoint + '/version', function (error, response, body) {
    try {
      if (body !== undefined) {
        sendOutput(200, res, body);
      } else {
        sendOutput(500, res, '{"error" : "Server Error"}');
      }
    } catch (err) {
      logger.winston.error(err);
      sendOutput(500, res, '{"error" : ' + err + "}");
    }
  });
}