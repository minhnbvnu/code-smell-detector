function checkRasaUI() {
  logger.winston.info(
    'Rasa UI Server: http://localhost:' + listener.address().port
  );
}