function getAllBots(req, res, next) {
  logger.winston.info('Bot.getAllBots');
  db.all('select * from bots order by bot_id desc', function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json(data);
    }
  });
}