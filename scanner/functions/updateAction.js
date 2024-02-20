function updateAction(req, res, next) {
  logger.winston.info('actions.updateAction');
  db.run('update actions set action_name = ? where action_id = ?', [req.body.action_name, req.body.bot_id], function(err) {
    if (err) {
      logger.winston.error("Error updating the record");
    } else {
      res.status(200).json({ status: 'success', message: 'Updated' });
    }
  });
}