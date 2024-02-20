function getBotIntents(req, res, next) {
  logger.winston.info('intents.getBotIntents');
  db.all('select * from intents where bot_id = ? order by intent_id desc', req.params.bot_id, function(err, data) {
    if (err) {
      logger.winston.error(err);;
    } else {
      res.status(200).json(data);
    }
  });
}