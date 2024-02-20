function removeBot(req, res) {
  logger.winston.info('Bot.updateBot');
  db.run('delete from bots where bot_id = ?', req.params.bot_id, function(err) {
    if (err) {
      logger.winston.error("Error removing the record");
    } else {
      res.status(200).json({ status: 'success', message: 'Removed' });
    }
  });
}