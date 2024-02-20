function updateEntity(req, res, next) {
  logger.winston.info('entities.updateEntity');

  db.run('update entities set entity_name = ?, slot_data_type = ? where entity_id = ?', [req.body.entity_name, req.body.slot_data_type, req.params.entity_id], function(err) {
    if (err) {
      logger.winston.error("Error updating the record");
    } else {
      res.status(200).json({ status: 'success', message: 'Updated' });
    }
  });
}