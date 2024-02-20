function updateSetting(req, res, next) {
  logger.winston.info('settings.updateSetting');
  db.run('update settings set setting_value = ? where setting_name = ?', [req.body.setting_value, req.body.setting_name], function(err) {
    if (err) {
      logger.winston.error("Error updating the record");
    } else {
      res.status(200).json({ status: 'success', message: 'Updated' });
    }
  });
}