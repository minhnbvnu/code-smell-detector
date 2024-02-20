function getSingleEntity(req, res, next) {
  logger.winston.info('Entities.getSingleEntity');
  db.get('select * from entities where entity_id = ?', req.params.entity_id, function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json(data);
    }
  });
}