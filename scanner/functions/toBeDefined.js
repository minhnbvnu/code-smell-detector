function toBeDefined() {
    return {
      compare: function(actual) {
        return {
          pass: (void 0 !== actual)
        };
      }
    };
  }