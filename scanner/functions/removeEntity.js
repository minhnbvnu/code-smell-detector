function removeEntity(req, res, next) {
  logger.winston.info('entities.updateEntity');
  db.run('delete from entities where entity_id = ?', req.params.entity_id, function(err) {
    if (err) {
      logger.winston.error("Error removing the record");
    } else {
      res.status(200).json({ status: 'success', message: 'Removed' });
    }
  });
}