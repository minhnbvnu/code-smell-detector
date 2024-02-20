function createExpressionParameter(req, res, next) {
  logger.winston.info('parameters.createExpressionParameter');
  db.run('insert into expression_parameters(expression_id, parameter_start, parameter_end, parameter_value, intent_id)' + 'values (?,?,?,?,?)', [req.body.expression_id, req.body.parameter_start, req.body.parameter_end, req.body.parameter_value, req.body.intent_id], function(err) {
    if (err) {
      logger.winston.error("Error inserting a new record");
    } else {
      res.status(200).json({ status: 'success', message: 'Inserted' });
    }
  });
}