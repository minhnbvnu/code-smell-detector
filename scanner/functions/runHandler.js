function runHandler(handler, rules, dtstart, max, callback) {
  var res = {};
  async.eachLimit(rules, CONCURRENCY, function(rule, eachcb) {
    handler(rule, dtstart, max, function(err, result) {
      res[rule] = err || result;
      eachcb();
    });
  }, function(err) {
    callback(null, res);
  });
}