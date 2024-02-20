function updateConversation(conversation_id, conversation) {
  //Update the DB with the latest results
  db.run('update conversations set conversation = ? where conversation_id = ?', [conversation, conversation_id], function (err) {
    if (err) {
      logger.winston.error("Error updating the record");
    } else {
      logger.winston.info("Updated conversation");
    }
  });
}