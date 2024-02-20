function mergeAsArray$1(to, from) {
    return to ? [...new Set([].concat(to, from))] : from;
  }