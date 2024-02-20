function createRegex(req, res, next) {
  logger.winston.info('regex.createRegex');
  db.run('insert into regex(bot_id, regex_name, regex_pattern)' + 'values (?,?,?)', [req.body.bot_id, req.body.regex_name, req.body.regex_pattern], function(err) {
    if (err) {
      logger.winston.error("Error inserting a new record");
    } else {
      res.status(200).json({ status: 'success', message: 'Inserted' });
    }
  });
}