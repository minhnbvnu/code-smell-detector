function getSingleSynonym(req, res, next) {
  logger.winston.info('synonym.getSingleSynonym');
  db.get('select * from synonyms where synonym_id = ?', req.params.synonym_id, function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json(data);
    }
  });
}