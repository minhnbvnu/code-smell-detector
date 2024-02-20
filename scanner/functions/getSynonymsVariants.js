function getSynonymsVariants(req, res, next) {
  logger.winston.info('variants.getSynonymVariants');
  const synonymsId = req.params.synonyms_id;
  var array_synonymIds = synonymsId.split(","); //Very hacky due to the node-sqlite not supporting IN from an array
  db.all('select * from synonym_variants where synonym_id in (' + array_synonymIds + ')', function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json(data);
    }
  });
}