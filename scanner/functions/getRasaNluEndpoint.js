function getRasaNluEndpoint(req, res, next) {
  logger.winston.info("Rasa NLU Endpoint Request");
  sendOutput(200, res, '{"url" : "' + global.rasa_endpoint + '"}');
}