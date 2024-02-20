function updateExpression(req, res, next) {
  logger.winston.info('expressions.updateExpressionEndpoint');
  db.run('update expressions set expression_text = ? where expression_id = ?', [req.body.expression_text, req.body.expression_id], function(err) {
    if (err) {
      logger.winston.error("Error updating the record");
    } else {
      res.status(200).json({ status: 'success', message: 'Updated' });
    }
  });
}