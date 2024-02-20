function updateParameter(req, res, next) {
  //Sets the entity once a new parameter has been created
  logger.winston.info('parameters.updateParameter');
  db.run('update expression_parameters set entity_id = ? where parameter_id = ?', [req.body.entity_id, req.body.parameter_id], function(err) {
    if (err) {
      logger.winston.error("Error updating the record");
    } else {
      res.status(200).json({ status: 'success', message: 'Updated' });
    }
  });
}