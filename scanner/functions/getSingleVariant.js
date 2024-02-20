function getSingleVariant(req, res, next) {
  logger.winston.info('variants.getSingleVariant');
  db.get('select * from synonym_variants where synonym_variant_id = ?', req.params.synonym_variant_id, function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json(data);
    }
  });
}