function deduceArrayType(x, constructor) {
    if (constructor === Array || !Number.isFinite(x)) {
      return Array;
    }
    return constructor === Float64Array || Math.fround(x) !== x ? Float64Array : Float32Array;
  }