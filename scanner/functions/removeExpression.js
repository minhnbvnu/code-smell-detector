function removeExpression(req, res, next) {
  logger.winston.info('expressions.removeExpression');
  db.run('delete from expressions where expression_id = ?', req.params.expression_id, function(err) {
    if (err) {
      logger.winston.error("Error removing the record");
    } else {
      res.status(200).json({ status: 'success', message: 'Removed' });
    }
  });
}