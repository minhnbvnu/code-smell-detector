function getExpressionParameters(req, res, next) {
  logger.winston.info('parameters.getExpressionParameters');
  db.all('select * from expression_parameters where expression_id = ?', req.params.expression_id, function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json(data);
    }
  });
}