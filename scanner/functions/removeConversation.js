function removeConversation(req, res, next) {
  logger.winston.info('Conversations.removeConversation');
  db.run('delete from conversations where conversation_id = ?', req.query.conversation_id, function(err) {
    if (err) {
      logger.winston.error("Error removing the record");
    } else {
      res.status(200).json({ status: 'success', message: 'Removed' });
    }
  });
}