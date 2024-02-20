function executeStatement(statement, args) {
      var result = statement.apply(this, args);
      if (angular.isFunction(result) || result instanceof angular.scenario.Future)
        return result;
      var self = this;
      var chain = angular.extend({}, result);
      angular.forEach(chain, function(value, name) {
        if (angular.isFunction(value)) {
          chain[name] = function() {
            return executeStatement.call(self, value, arguments);
          };
        } else {
          chain[name] = value;
        }
      });
      return chain;
    }