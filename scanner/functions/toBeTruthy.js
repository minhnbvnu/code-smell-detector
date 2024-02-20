function toBeTruthy() {
    return {
      compare: function(actual) {
        return {
          pass: !!actual
        };
      }
    };
  }