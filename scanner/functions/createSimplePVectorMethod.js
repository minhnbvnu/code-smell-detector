function createSimplePVectorMethod(method) {
      return function(v1, v2) {
        return v1[method](v2);
      };
    }