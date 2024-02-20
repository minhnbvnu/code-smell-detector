function expensiveCheckFn(scope, locals, assign, inputs) {
        var expensiveCheckOldValue = runningChecksEnabled;
        runningChecksEnabled = true;
        try {
          return fn(scope, locals, assign, inputs);
        } finally {
          runningChecksEnabled = expensiveCheckOldValue;
        }
      }