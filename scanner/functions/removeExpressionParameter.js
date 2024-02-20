function removeExpressionParameter(req, res, next) {
  db.run('delete from expression_parameters where parameter_id = ?', req.params.parameter_id, function(err) {
    if (err) {
      logger.winston.error("Error removing the record");
    } else {
      res.status(200).json({ status: 'success', message: 'Removed' });
    }
  });
}