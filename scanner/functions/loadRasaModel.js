function loadRasaModel(req, res, next) {
  logger.winston.info("Load Rasa Model Request -> " + global.rasa_endpoint + "/model");
  request({ method: "PUT", uri: global.rasa_endpoint + "/model", body: JSON.stringify(req.body) }, function (error, response, body) {
    if (error) {
      logger.winston.error(error);
      sendOutput(500, res, '{"error" : ' + error + '}');
    }
    try {
      if (body !== undefined) {
        logger.winston.info("Load Rasa Model Response:" + body);
        sendOutput(200, res, body);
      }
    } catch (err) {
      logger.winston.error(err);
      sendOutput(500, res, '{"error" : ' + err + '}');
    }
  });
}