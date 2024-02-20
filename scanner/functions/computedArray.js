function computedArray(inner) {
    return function(self, args) {
      return new infer.Arr(inner(self, args));
    };
  }