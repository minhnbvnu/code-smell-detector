function getIntentParameters(req, res, next) {
  logger.winston.info('parameters.getIntentParameters');
  db.all('select * from expression_parameters where intent_id = ?', req.params.intent_id, function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json(data);
    }
  });
}