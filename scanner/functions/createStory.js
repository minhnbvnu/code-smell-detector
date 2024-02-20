function createStory(req, res, next) {
  logger.winston.info('Stories.createStory');
  db.run('insert into stories(story_name, story, bot_id)' + 'values (?,?,?)', [req.body.story_name, req.body.story, req.body.bot_id], function(err) {
    if (err) {
      logger.winston.error("Error inserting a new record");
    } else {
      res.status(200).json({ status: 'success', message: 'Inserted' });
    }
  });
}