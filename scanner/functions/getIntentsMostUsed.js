function getIntentsMostUsed(req, res, next) {
  const bot_id = req.params.bot_id;
  db.any('select * from intents_most_used where bot_id=$1', bot_id)
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}