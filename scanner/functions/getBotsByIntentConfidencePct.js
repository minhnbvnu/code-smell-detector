function getBotsByIntentConfidencePct(req, res, next) {
  const bot_id = req.params.bot_id;
  db.any('select count(*),intent_confidence_pct, bots.bot_id, bots.bot_name from nlu_parse_log, bots, messages '
    + ' where messages.bot_id = bots.bot_id and messages.messages_id=nlu_parse_log.messages_id '
    + ' and bots.bot_id=$1 group by intent_confidence_pct, bots.bot_id, bots.bot_name ', bot_id)
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}