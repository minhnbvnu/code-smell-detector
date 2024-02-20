function getBotRegex(req, res, next) {
  logger.winston.info('regex.getBotRegex');
  db.all('select * from regex where bot_id = ? order by regex_id desc', req.params.bot_id, function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json(data);
    }
  });
}