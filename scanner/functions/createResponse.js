function createResponse(req, res, next) {
  logger.winston.info('responses.createResponse');
  db.run('insert into responses (response_text, action_id, response_type)' + 'values (?,?,?)', [req.body.response_text, req.body.action_id, req.body.response_type], function(err) {
    if (err) {
      logger.winston.error("Error inserting a new record");
    } else {
      res.status(200).json({ status: 'success', message: 'Inserted' });
    }
  });
}