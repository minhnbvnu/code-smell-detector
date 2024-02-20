function removeStory(req, res) {
  logger.winston.info('Stories.updateStory');
  db.run('delete from stories where story_id = ?', req.query.story_id, function(err) {
    if (err) {
      logger.winston.error("Error removing the record");
    } else {
      res.status(200).json({ status: 'success', message: 'Removed' });
    }
  });
}