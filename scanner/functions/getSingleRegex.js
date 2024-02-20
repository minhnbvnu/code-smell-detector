function getSingleRegex(req, res, next) {
  logger.winston.info('regex.getSingleRegex');
  db.get('select * from regex where regex_id = ?', req.params.regex_id, function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json(data);
    }
  });
}