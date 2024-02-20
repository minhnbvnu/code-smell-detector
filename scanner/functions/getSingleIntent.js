function getSingleIntent(req, res, next) {
  logger.winston.info('intents.getSingleIntents');
  db.get('select * from intents where intent_id = ?', req.params.intent_id, function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json(data);
    }
  });
}