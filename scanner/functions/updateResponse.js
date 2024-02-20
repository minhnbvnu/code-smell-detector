function updateResponse(req, res, next) {
  logger.winston.info('responses.updateResponse');
  db.run('update responses set response_text = ?, response_type = ? where response_id = ?', [req.body.response_text, req.body.response_type, req.body.response_id], function(err) {
    if (err) {
      logger.winston.error("Error updating the record");
    } else {
      res.status(200).json({ status: 'success', message: 'Updated' });
    }
  });
}