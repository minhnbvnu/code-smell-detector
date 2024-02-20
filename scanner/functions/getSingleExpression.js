function getSingleExpression(req, res, next) {
  logger.winston.info('expression.getSingleExpression');

  db.get('select * from expressions where expression_id = ?', req.params.expression_id, function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json(data);
    }
  });
}