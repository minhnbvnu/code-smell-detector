function removeVariant(req, res, next) {
  logger.winston.info('variants.removeVariant');
  db.run('delete from synonym_variants where synonym_variant_id = ?', req.params.synonym_variant_id, function(err) {
    if (err) {
      logger.winston.error("Error removing the record");
    } else {
      res.status(200).json({ status: 'success', message: 'Removed' });
    }
  });
}