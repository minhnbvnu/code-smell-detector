function toBeNull() {
    return {
      compare: function(actual) {
        return {
          pass: actual === null
        };
      }
    };
  }