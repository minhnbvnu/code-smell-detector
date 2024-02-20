function updateStory(conversation_id, story) {
  db.run('update conversations set story = ? where conversation_id = ?', [story, conversation_id], function (err) {
    if (err) {
      logger.winston.info("Error updating the record");
    } else {
      logger.winston.info("Updated story");
    }
  });
}