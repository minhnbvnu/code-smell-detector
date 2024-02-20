function computedTuple(types) {
    return function(self, args) {
      return new infer.Arr(types.map(function(tp) { return unwrapType(tp, self, args) }));
    };
  }