function getAllBotStories(req, res, next) {
  logger.winston.info('Stories.getAllStories');
  db.all('select * from stories where bot_id = ? order by story_id desc', req.params.bot_id, function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json(data);
    }
  });
}