function createBotSynonym(req, res, next) {
  logger.winston.info('synonym.createBotSynonym');
  db.run('insert into synonyms(bot_id, synonym_reference, regex_pattern)' + 'values (?,?,?)', [req.body.bot_id, req.body.synonym_reference, req.body.regex_pattern], function(err) {
    if (err) {
      logger.winston.error("Error inserting a new record");
    } else {
      db.get('SELECT last_insert_rowid()', function(err, data) {
        if (err) {
          res.status(500).json({ status: 'error', message: '' });
        } else {
          res.status(200).json({ status: 'success', message: 'Inserted', synonym_id: data['last_insert_rowid()'] });
        }
      });
    }
  });
}