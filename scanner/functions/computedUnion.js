function computedUnion(types) {
    return function(self, args) {
      var union = new infer.AVal;
      for (var i = 0; i < types.length; i++) unwrapType(types[i], self, args).propagate(union);
      union.maxWeight = 1e5;
      return union;
    };
  }