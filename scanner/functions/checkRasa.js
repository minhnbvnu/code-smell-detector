function checkRasa() {
  request(global.rasa_endpoint + '/status', {timeout: 12000}, function(error, response, body) {
    try {
      logger.winston.info('Rasa Server: ' + global.rasa_endpoint);
      if (body !== undefined) {
        logger.winston.info('--> Connected');
      }
      if (error !== null) {
        logger.winston.error('--> Unable to connect to Rasa Server: ' + error);
      }
    } catch (err) {
      logger.winston.error('Rasa Connection Error: ' + err);
    }
  });
}