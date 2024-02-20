function getActiveUserCountLast30Days(req, res, next) {
  db.any('select * from active_user_count_30_days')
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}