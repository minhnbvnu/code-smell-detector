function getIntentUsageByDay(req, res, next) {
  db.all("select strftime('%m/%d', timestamp) as day, count(*) as cnt from nlu_log group by strftime('%m/%d', timestamp)", req.params.query, function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json(data);
    }
  });
}