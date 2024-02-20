function getRasaNluStatus(req, res, next) {
  logger.winston.info('Rasa NLU Status Request -> ' + global.rasa_endpoint + '/status');
  request(global.rasa_endpoint + '/status', function (error, response, body) {
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