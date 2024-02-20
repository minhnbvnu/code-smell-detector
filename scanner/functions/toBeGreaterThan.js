function toBeGreaterThan() {
    return {
      compare: function(actual, expected) {
        return {
          pass: actual > expected
        };
      }
    };
  }