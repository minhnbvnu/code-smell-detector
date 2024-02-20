function isFinite(value) {
      return typeof value == 'number' && nativeIsFinite(value);
    }