function $parse(exp, interceptorFn, expensiveChecks) {
      var parsedExpression, oneTime, cacheKey;

      expensiveChecks = expensiveChecks || runningChecksEnabled;

      switch (typeof exp) {
        case 'string':
          exp = exp.trim();
          cacheKey = exp;

          var cache = (expensiveChecks ? cacheExpensive : cacheDefault);
          parsedExpression = cache[cacheKey];

          if (!parsedExpression) {
            if (exp.charAt(0) === ':' && exp.charAt(1) === ':') {
              oneTime = true;
              exp = exp.substring(2);
            }
            var parseOptions = expensiveChecks ? $parseOptionsExpensive : $parseOptions;
            var lexer = new Lexer(parseOptions);
            var parser = new Parser(lexer, $filter, parseOptions);
            parsedExpression = parser.parse(exp);
            if (parsedExpression.constant) {
              parsedExpression.$$watchDelegate = constantWatchDelegate;
            } else if (oneTime) {
              parsedExpression.$$watchDelegate = parsedExpression.literal ?
                  oneTimeLiteralWatchDelegate : oneTimeWatchDelegate;
            } else if (parsedExpression.inputs) {
              parsedExpression.$$watchDelegate = inputsWatchDelegate;
            }
            if (expensiveChecks) {
              parsedExpression = expensiveChecksInterceptor(parsedExpression);
            }
            cache[cacheKey] = parsedExpression;
          }
          return addInterceptor(parsedExpression, interceptorFn);

        case 'function':
          return addInterceptor(exp, interceptorFn);

        default:
          return addInterceptor(noop, interceptorFn);
      }
    }