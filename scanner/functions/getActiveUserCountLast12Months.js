function getActiveUserCountLast12Months(req, res, next) {
  db.any('select * from active_user_count_12_months')
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}