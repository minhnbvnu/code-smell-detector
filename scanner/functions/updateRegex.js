function updateRegex(req, res, next) {
  logger.winston.info('regex.updateRegex');
  db.run('update regex set regex_name = ?, regex_pattern = ? where regex_id = ?', [req.body.regex_name, req.body.regex_pattern, req.body.regex_id], function(err) {
    if (err) {
      logger.winston.error("Error updating the record");
    } else {
      res.status(200).json({ status: 'success', message: 'Updated' });
    }
  });
}