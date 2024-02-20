function unloadRasaModel(req, res, next) {
  logger.winston.info("Delete Rasa Model Request -> " + global.rasa_endpoint + "/model");
  request({ method: "DELETE", uri: global.rasa_endpoint + "/model" }, function (error, response, body) {
    if (error) {
      logger.winston.error(error);
      sendOutput(500, res, '{"error" : ' + error + '}');
    }
    try {
      if (body !== undefined) {
        logger.winston.info("Unload Rasa Model Response:" + body);
        sendOutput(200, res, body);
      }
    } catch (err) {
      logger.winston.error(err);
      sendOutput(500, res, '{"error" : ' + err + '}');
    }
  });
}