function getConversations(req, res, next) {
  logger.winston.info('Conversations.getConversations');
  db.all('select * from conversations where bot_id = ? order by timestamp desc', req.params.bot_id, function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json(data);
    }
  });
}