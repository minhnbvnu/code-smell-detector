function getIntentExpressions(req, res, next) {
  logger.winston.info('expression.getIntentExpressions');
  db.all('select * from expressions where intent_id = ?  order by expression_id desc', req.params.intent_id, function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json(data);
    }
  });
}