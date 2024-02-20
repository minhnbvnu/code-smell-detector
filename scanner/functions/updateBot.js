function updateBot(req, res, next) {
  logger.winston.info('Bot.updateBot');
  db.run('update bots set bot_name = ?, output_folder = ?, bot_config = ? where bot_id = ?', [req.body.bot_name, req.body.output_folder, req.body.bot_config, req.body.bot_id], function(err) {
    if (err) {
      logger.winston.error("Error updating the record");
    } else {
      res.status(200).json({ status: 'success', message: 'Updated' });
    }
  });
}