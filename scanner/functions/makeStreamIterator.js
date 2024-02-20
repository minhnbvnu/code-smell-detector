function makeStreamIterator(stream, options) {
    return isBrowser ? makeBrowserStreamIterator(stream, options) : makeNodeStreamIterator(stream, options);
  }