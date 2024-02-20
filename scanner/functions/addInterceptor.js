function addInterceptor(parsedExpression, interceptorFn) {
      if (!interceptorFn) return parsedExpression;
      var watchDelegate = parsedExpression.$$watchDelegate;
      var useInputs = false;

      var regularWatch =
          watchDelegate !== oneTimeLiteralWatchDelegate &&
          watchDelegate !== oneTimeWatchDelegate;

      var fn = regularWatch ? function regularInterceptedExpression(scope, locals, assign, inputs) {
        var value = useInputs && inputs ? inputs[0] : parsedExpression(scope, locals, assign, inputs);
        return interceptorFn(value, scope, locals);
      } : function oneTimeInterceptedExpression(scope, locals, assign, inputs) {
        var value = parsedExpression(scope, locals, assign, inputs);
        var result = interceptorFn(value, scope, locals);
        // we only return the interceptor's result if the
        // initial value is defined (for bind-once)
        return isDefined(value) ? result : value;
      };

      // Propagate $$watchDelegates other then inputsWatchDelegate
      if (parsedExpression.$$watchDelegate &&
          parsedExpression.$$watchDelegate !== inputsWatchDelegate) {
        fn.$$watchDelegate = parsedExpression.$$watchDelegate;
      } else if (!interceptorFn.$stateful) {
        // If there is an interceptor, but no watchDelegate then treat the interceptor like
        // we treat filters - it is assumed to be a pure function unless flagged with $stateful
        fn.$$watchDelegate = inputsWatchDelegate;
        useInputs = !parsedExpression.inputs;
        fn.inputs = parsedExpression.inputs ? parsedExpression.inputs : [parsedExpression];
      }

      return fn;
    }