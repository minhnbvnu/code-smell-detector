function getAllEntitiesForBot(req, res, next) {
  logger.winston.info('Entities.getAllEntitiesForBot');
  db.all('select * from entities where bot_id = ?  order by entity_id desc', req.params.bot_id, function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json(data);
    }
  });
}