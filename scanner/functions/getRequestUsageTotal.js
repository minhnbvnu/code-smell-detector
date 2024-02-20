function getRequestUsageTotal(req, res, next) {
  db.get("select count(*) from nlu_log where event_type = 'parse'", req.params.query, function(err, data) {
    if (err) {
      logger.winston.error(err);
    } else {
      res.status(200).json({total_request_usage: data['count(*)']});
    }
  });
}