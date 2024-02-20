function executeRules(rules, message, global, current) {

  current = current || 1;

  if (_.isEmpty(rules)) {
    // if empty, means all rules failed
    return new Promise(function(resolve, reject) {
      reject();
    });
  }

  var first = _(rules).first();
  return new Promise(function(resolve, reject) {
    // rules doesn't exist
    if (!_.isFunction(Types[first.type])) {
      reject();
    }
    // check if the first rule applies
    Types[first.type](first, message, global)
      .then(
        function () {
          var rule = _.clone(first);
          rule.index = current;
          resolve(rule);
        },
        function () {
          var nextRules = _.rest(rules);
          if (_.isEmpty(nextRules)) {
            reject();
          } else {
            executeRules(nextRules, message, global, current + 1)
              .then(
                function(rule) {
                  resolve(rule);
                },
                function() {
                  reject();
                }
              );
          }
        }
      );
  });
}