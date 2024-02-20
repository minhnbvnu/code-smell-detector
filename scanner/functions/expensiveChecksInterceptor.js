function expensiveChecksInterceptor(fn) {
      if (!fn) return fn;
      expensiveCheckFn.$$watchDelegate = fn.$$watchDelegate;
      expensiveCheckFn.assign = expensiveChecksInterceptor(fn.assign);
      expensiveCheckFn.constant = fn.constant;
      expensiveCheckFn.literal = fn.literal;
      for (var i = 0; fn.inputs && i < fn.inputs.length; ++i) {
        fn.inputs[i] = expensiveChecksInterceptor(fn.inputs[i]);
      }
      expensiveCheckFn.inputs = fn.inputs;

      return expensiveCheckFn;

      function expensiveCheckFn(scope, locals, assign, inputs) {
        var expensiveCheckOldValue = runningChecksEnabled;
        runningChecksEnabled = true;
        try {
          return fn(scope, locals, assign, inputs);
        } finally {
          runningChecksEnabled = expensiveCheckOldValue;
        }
      }
    }