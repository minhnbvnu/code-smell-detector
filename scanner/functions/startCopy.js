function startCopy(source) {
    started++;
    if (filter) {
      if (filter instanceof RegExp) {
        if (!filter.test(source)) {
          return cb(true);
        }
      }
      else if (typeof filter === 'function') {
        if (!filter(source)) {
          return cb(true);
        }
      }
    }
    return getStats(source);
  }