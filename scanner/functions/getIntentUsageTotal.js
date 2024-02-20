function getIntentUsageTotal(req, res, next) {
  const data = db.get('nlu_log')
    .filter({ event_type: 'parse' })
    .size()
    .value()
  res.status(200).json({intent_usage: data});
}