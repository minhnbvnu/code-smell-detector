function updateIntent(req, res, next) {
  logger.winston.info('intents.updateIntent');

  db.run('update intents set intent_name = ? where intent_id = ?', [req.body.intent_name, req.params.intent_id], function(err) {
    if (err) {
      logger.winston.error("Error updating the record");
    } else {
      res.status(200).json({ status: 'success', message: 'Updated' });
    }
  });
}