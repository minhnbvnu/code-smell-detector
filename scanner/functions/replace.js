function replace(dest, source) {
      for (var prop in source) {
        dest[prop] = source[prop];
      }
    }