function createBot(req, res, next) {
  logger.winston.info('Bot.createBot');
  db.run('insert into bots(bot_name, bot_config, output_folder)' + 'values (?,?,?)', [req.body.bot_name, req.body.bot_config, req.body.output_folder], function(err) {
    if (err) {
      logger.winston.error("Error inserting a new record");
    } else {
      res.status(200).json({ status: 'success', message: 'Inserted' });
    }
  });
}