function createConversation(req, res, next) {
  logger.winston.info('Conversations.createConversation');
  db.run('insert into conversations(bot_id)' + 'values (?)', [req.body.bot_id], function(err) {
    if (err) {
      logger.winston.error("Error inserting a new record");
    } else {
      res.status(200).json({ status: 'success', message: 'Inserted' });
    }
  });
}