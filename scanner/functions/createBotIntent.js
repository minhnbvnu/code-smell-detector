function createBotIntent(req, res, next) {
  logger.winston.info('intents.createBotIntent');
  db.run('insert into intents (bot_id, intent_name)' + 'values (?,?)', [req.body.bot_id, req.body.intent_name], function(err) {
    if (err) {
      logger.winston.error("Error inserting a new record");
    } else {
      res.status(200).json({ status: 'success', message: 'Inserted' });
    }
  });
}