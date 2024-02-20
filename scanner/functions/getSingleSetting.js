function getSingleSetting(req, res, next) {
  logger.winston.info('settings.getSingleSetting');
  const settingName = req.params.setting_name;

  db.get('select * from settings where setting_name = ?', settingName, function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json(data);
    }
  });
}