function removeRegex(req, res, next) {
  logger.winston.info('regex.removeRegex');
  db.run('delete from regex where regex_id = ?', req.params.regex_id, function(err) {
    if (err) {
      logger.winston.error("Error removing the record");
    } else {
      res.status(200).json({ status: 'success', message: 'Removed' });
    }
  });
}