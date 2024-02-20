function createEntity(req, res, next) {
  logger.winston.info('Entities.createEntity');
  
  db.run('insert into entities(bot_id, entity_name, slot_data_type)' + 'values (?,?,?)', [req.body.bot_id, req.body.entity_name, req.body.slot_data_type], function(err) {
    if (err) {
      logger.winston.error("Error inserting a new record");
    } else {
      res.status(200).json({ status: 'success', message: 'Inserted' });
    }
  });
}