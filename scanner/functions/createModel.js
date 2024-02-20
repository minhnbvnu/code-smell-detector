function createModel(req, res, next) {
  logger.winston.info('Bot.createModel');
  db.run('insert into models(model_name, comment, bot_id, server_path, local_path)' + 'values (?,?,?,?,?)', [req.body.file_name, req.body.comment, req.body.bot_id, req.body.server_path, 'Manually added'], function (err) {
    if (err) {
      logger.winston.error("Error inserting a new record: " + err);
    } else {
      logger.winston.info("Model saved to models table");
      res.status(200).json({ status: 'success', message: 'Inserted' });
    }
  });
}