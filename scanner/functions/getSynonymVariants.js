function getSynonymVariants(req, res, next) {
  logger.winston.info('variants.getSynonymVariants');
  db.all('select * from synonym_variants where synonym_id = ? order by synonym_variant_id desc', req.params.synonym_id, function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json(data);
    }
  });
}