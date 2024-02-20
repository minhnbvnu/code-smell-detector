function AssertionError (options) {
      options = options || {};
      this.message = options.message;
      this.actual = options.actual;
      this.expected = options.expected;
      this.operator = options.operator;
      this.showDiff = options.showDiff;

      if (options.stackStartFunction && Error.captureStackTrace) {
        var stackStartFunction = options.stackStartFunction;
        Error.captureStackTrace(this, stackStartFunction);
      }
    }