function removeSynonym(req, res, next) {
  logger.winston.info('synonym.removeExpression');
  db.run("delete from synonym_variants where synonym_id = ?", req.params.synonym_id);
  db.run('delete from synonyms where synonym_id = ?', req.params.synonym_id, function(err) {
    if (err) {
      logger.winston.error("Error removing the record");
    } else {
      res.status(200).json({ status: 'success', message: 'Removed' });
    }
  });
}