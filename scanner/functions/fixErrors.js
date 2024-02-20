function fixErrors(code, config) {
      return function (result) {
        var r = copyResults(result, config);
        fixError(r, code);
      };
    }