function isBrowserModule(line) {
    return (~line.indexOf('node_modules')) ||
      (~line.indexOf('components'));
  }