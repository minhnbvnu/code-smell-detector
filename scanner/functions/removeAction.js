function removeAction(req, res, next) {
  logger.winston.info('actions.removeAction');
  db.run('delete from actions where action_id = ?', req.query.action_id, function(err) {
    if (err) {
      logger.winston.error("Error removing the record");
    } else {
      db.run('delete from responses where action_id = ?', req.query.action_id);
      res.status(200).json({ status: 'success', message: 'Removed' });
    }
  });
}