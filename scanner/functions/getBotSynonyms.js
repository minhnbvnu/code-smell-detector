function getBotSynonyms(req, res, next) {
  logger.winston.info('synonym.getBotSynonyms');

  db.all('select * from synonyms where bot_id = ? order by synonym_id desc', req.params.bot_id, function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json(data);
    }
  });
}