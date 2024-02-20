function constantWatchDelegate(scope, listener, objectEquality, parsedExpression) {
      var unwatch;
      return unwatch = scope.$watch(function constantWatch(scope) {
        unwatch();
        return parsedExpression(scope);
      }, listener, objectEquality);
    }