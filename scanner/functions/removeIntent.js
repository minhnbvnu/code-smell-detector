function removeIntent(req, res, next) {
  //Remove all sub components of intent
  logger.winston.info('intents.removeIntent');

  db.run('delete from intents where intent_id = ?', req.params.intent_id, function(err) {
    if (err) {
      logger.winston.error("Error removing the record");
    } else {
      res.status(200).json({ status: 'success', message: 'Removed' });
    }
  });
}