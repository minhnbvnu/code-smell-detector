function createIntentExpression(req, res, next) {
  logger.winston.info('expressions.createIntentExpression');
  db.run('insert into expressions(intent_id, expression_text)' + 'values (?,?)', [req.body.intent_id, req.body.expression_text], function(err) {
    if (err) {
      logger.winston.error("Error inserting a new record");
    } else {
      res.status(200).json({ status: 'success', message: 'Inserted' });
    }
  });
}