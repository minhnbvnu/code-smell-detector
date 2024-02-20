function getAvgIntentUsageByDay(req, res, next) {
  db.any('select round(avg(count)) as avg from intent_usage_by_day')
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}