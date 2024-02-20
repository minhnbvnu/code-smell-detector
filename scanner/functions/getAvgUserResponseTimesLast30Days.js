function getAvgUserResponseTimesLast30Days(req, res, next) {
  db.any('select * from avg_user_response_times_30_days')
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}