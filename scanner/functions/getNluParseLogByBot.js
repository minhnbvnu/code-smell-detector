function getNluParseLogByBot(req, res, next) {
  const bot_id = req.params.bot_id;
  db.any('select * from nlu_parse_log where bot_id = $1 order by timestamp desc', bot_id)
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}