function getAllEntities(req, res, next) {
  logger.winston.info('Entities.getAllEntities');
  db.all('select * from entities', function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json(data);
    }
  });
}