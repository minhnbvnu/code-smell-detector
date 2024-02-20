function getExpressionParametersQuery(req, res, next) {
  logger.winston.info('parameters.getExpressionParametersQuery');
  const expressionIds = req.query.expression_ids;
  var array_expressionIds = expressionIds.split(","); //Very hacky due to the node-sqlite not supporting IN from an array
  db.all("select * from expression_parameters inner join entities on expression_parameters.entity_id = entities.entity_id where expression_id in (" + array_expressionIds + ")", function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json(data);
    }
  });
  
}