function isMochaInternal(line) {
    return (
      ~line.indexOf('node_modules' + slash + 'mocha' + slash) ||
      ~line.indexOf('node_modules' + slash + 'mocha.js') ||
      ~line.indexOf('bower_components' + slash + 'mocha.js') ||
      ~line.indexOf(slash + 'mocha.js')
    );
  }