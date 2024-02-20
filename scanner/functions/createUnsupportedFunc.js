function createUnsupportedFunc(n) {
      return function() {
        throw "Processing.js does not support " + n + ".";
      }
    }