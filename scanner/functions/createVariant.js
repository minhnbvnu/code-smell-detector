function createVariant(req, res, next) {
  logger.winston.info('variants.createVariant');
  db.run('insert into synonym_variants (synonym_id, synonym_value)' + 'values (?, ?)', [req.body.synonym_id, req.body.synonym_value], function(err) {
    if (err) {
      logger.winston.error("Error inserting a new record");
    } else {
      db.get('SELECT last_insert_rowid()', function(err, data) {
        if (err) {
          res.status(500).json({ status: 'error', message: '' });
        } else {
          res.status(200).json({ status: 'success', message: 'Inserted', synonym_variant_id: data['last_insert_rowid()'] });
        }
      });
    }
  });
}