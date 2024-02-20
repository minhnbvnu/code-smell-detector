function createAction(req, res, next) {
  logger.winston.info('actions.createAction');
  db.run('insert into actions (action_name, bot_id)' + 'values (?,?)', [req.body.action_name, req.body.bot_id], function(err) {
    if (err) {
      logger.winston.error("Error inserting a new record");
    } else {
      res.status(200).json({ status: 'success', message: 'Inserted' });
    }
  });
}