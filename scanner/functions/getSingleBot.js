function getSingleBot(req, res, next) {
  logger.winston.info('Bot.getSingleBot');
  db.get('select * from bots where bot_id = ?', req.params.bot_id, function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json(data);
    }
  });
}