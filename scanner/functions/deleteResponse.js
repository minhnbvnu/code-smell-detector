function deleteResponse(req, res, next) {
  logger.winston.info('responses.removeResponse');
  db.run('delete from responses where response_id = ?', req.query.response_id, function(err) {
    if (err) {
      logger.winston.error("Error removing the record");
    } else {
      res.status(200).json({ status: 'success', message: 'Removed' });
    }
  });
}