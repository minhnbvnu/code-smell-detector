function getIntentExpressionQuery(req, res, next) {
  logger.winston.info('expression.getIntentExpressionQuery');
  var array_intentIds = req.query.intent_ids.split(","); //Very hacky due to the node-sqlite not supporting IN from an array
  db.all('select * from expressions where intent_id in (' + array_intentIds + ')  order by expression_id desc', function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json(data);
    }
  });
}