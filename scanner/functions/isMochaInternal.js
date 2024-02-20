function isMochaInternal (line) {
    return (~line.indexOf('node_modules' + slash + 'mocha'))  ||
      (~line.indexOf('components' + slash + 'mochajs'))       ||
      (~line.indexOf('components' + slash + 'mocha'));
  }