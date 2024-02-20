function toBeFalsy() {
    return {
      compare: function(actual) {
        return {
          pass: !!!actual
        };
      }
    };
  }