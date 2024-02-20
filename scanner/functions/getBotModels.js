function getBotModels(req, res, next) {
  logger.winston.info('Model.getBotModels');
  db.all('select * from models where bot_id = ?  order by model_id desc', req.params.bot_id, function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json(data);
    }
  });
}